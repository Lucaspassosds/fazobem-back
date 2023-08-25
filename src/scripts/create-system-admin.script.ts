import {
  getConnectionManager,
  getConnectionOptions,
  createConnection,
} from 'typeorm';
import * as dotenv from 'dotenv';
import { User } from '../api/user/entities/user.entity';
import { hashPassword } from '../utils/utils';
import { UserSession } from '../auth/entities/user-session.entity';
import { UserRole } from '../constants/constants';

// Load environment variables from .env file
dotenv.config();

async function createUser() {
  const connectionManager = getConnectionManager();
  const connection = connectionManager.create({
    type: 'postgres', // Replace with your actual environment variable names
    host: process.env.POSTGRES_HOST,
    port: parseInt(process.env.POSTGRES_PORT),
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    name: 'create-user-connection',
    entities: [User, UserSession],
  });

  try {
    if (!connection.isConnected) {
      await connection.connect(); // Establish the connection if not connected
    }

    const userRepo = connection.getRepository(User);

    const user = new User();
    user.name = 'SYSTEM_ADMIN';
    user.email = 'admin@admin.com';
    user.role = UserRole.systemAdmin;
    const hashedPassword = await hashPassword('admin');
    user.password = hashedPassword;

    await userRepo.save(user);

    console.log('User created successfully');
  } catch (error) {
    console.error('Error creating user:', error);
  } finally {
    if (connection.isConnected) {
      await connection.close(); // Close the connection if connected
    }
  }
}

createUser();
