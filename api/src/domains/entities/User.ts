import { randomUUID } from 'crypto';

export class User {
  private readonly id: string;
  private name: string;
  private email: string;
  private readonly createdAt: Date;
  private updatedAt: Date;

  private constructor(params: {
    id?: string;
    name: string;
    email: string;
    createdAt?: Date;
    updatedAt?: Date;
  }) {
    // ID validation and generation
    if (params.id) {
      if (!this.isValidUUID(params.id)) {
        throw new Error(`Invalid user ID format: ${params.id}`);
      }
      this.id = params.id;
    } else {
      this.id = randomUUID();
    }

    // Name validation
    if (!params.name || params.name.trim().length === 0) {
      throw new Error('Name cannot be empty');
    }
    this.name = params.name.trim();

    // Email validation
    if (!this.isValidEmail(params.email)) {
      throw new Error(`Invalid email format: ${params.email}`);
    }
    this.email = params.email.toLowerCase();

    // Date initialization
    const now = new Date();
    this.createdAt = params.createdAt || now;
    this.updatedAt = params.updatedAt || now;
  }

  // Getters
  getId(): string {
    return this.id;
  }

  getName(): string {
    return this.name;
  }

  getEmail(): string {
    return this.email;
  }

  getCreatedAt(): Date {
    return this.createdAt;
  }

  getUpdatedAt(): Date {
    return this.updatedAt;
  }

  // Business methods
  changeName(name: string): void {
    if (!name || name.trim().length === 0) {
      throw new Error('Name cannot be empty');
    }
    this.name = name.trim();
    this.updatedAt = new Date();
  }

  changeEmail(email: string): void {
    if (!this.isValidEmail(email)) {
      throw new Error(`Invalid email format: ${email}`);
    }
    this.email = email.toLowerCase();
    this.updatedAt = new Date();
  }

  // Static factory method
  static create(params: { name: string; email: string }): User {
    return new User(params);
  }

  // Static factory method for reconstruction from DB
  static reconstruct(params: {
    id: string;
    name: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
  }): User {
    return new User(params);
  }

  // Validation methods
  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  private isValidUUID(uuid: string): boolean {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    return uuidRegex.test(uuid);
  }

  // Equality check
  equals(other: User): boolean {
    return this.id === other.id;
  }
}