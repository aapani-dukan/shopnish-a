import { users, sellerApplications, type User, type InsertUser, type SellerApplication, type InsertSellerApplication } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByFirebaseUid(firebaseUid: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUserSellerStatus(id: number, isApprovedSeller: boolean): Promise<User | undefined>;
  createSellerApplication(application: InsertSellerApplication): Promise<SellerApplication>;
  getSellerApplicationByUserId(userId: number): Promise<SellerApplication | undefined>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByFirebaseUid(firebaseUid: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.firebaseUid, firebaseUid));
    return user || undefined;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async updateUserSellerStatus(id: number, isApprovedSeller: boolean): Promise<User | undefined> {
    const [user] = await db
      .update(users)
      .set({ isApprovedSeller })
      .where(eq(users.id, id))
      .returning();
    return user || undefined;
  }

  async createSellerApplication(application: InsertSellerApplication): Promise<SellerApplication> {
    const [sellerApplication] = await db
      .insert(sellerApplications)
      .values(application)
      .returning();
    return sellerApplication;
  }

  async getSellerApplicationByUserId(userId: number): Promise<SellerApplication | undefined> {
    const [application] = await db
      .select()
      .from(sellerApplications)
      .where(eq(sellerApplications.userId, userId));
    return application || undefined;
  }
}

export const storage = new DatabaseStorage();
