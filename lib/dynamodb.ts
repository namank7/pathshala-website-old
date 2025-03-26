import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { 
  DynamoDBDocumentClient, 
  PutCommand, 
  GetCommand,
  QueryCommand,
  UpdateCommand,
  DeleteCommand
} from '@aws-sdk/lib-dynamodb';
import { User, Booking, Course } from '../types/database';

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

const USERS_TABLE = process.env.USERS_TABLE || 'pathshala-users';
const BOOKINGS_TABLE = process.env.BOOKINGS_TABLE || 'pathshala-bookings';
const COURSES_TABLE = process.env.COURSES_TABLE || 'pathshala-courses';

// User Operations
export async function createUser(userData: Omit<User, 'createdAt' | 'updatedAt'>): Promise<User> {
  const timestamp = new Date().toISOString();
  const user = {
    ...userData,
    createdAt: timestamp,
    updatedAt: timestamp,
  };

  try {
    await docClient.send(new PutCommand({
      TableName: USERS_TABLE,
      Item: user,
    }));
    return user as User;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
}

export async function getUserById(userId: string): Promise<User | null> {
  try {
    const response = await docClient.send(new GetCommand({
      TableName: USERS_TABLE,
      Key: { userId },
    }));
    return response.Item as User || null;
  } catch (error) {
    console.error('Error getting user:', error);
    throw error;
  }
}

export async function getUsersByType(userType: User['userType']): Promise<User[]> {
  try {
    const response = await docClient.send(new QueryCommand({
      TableName: USERS_TABLE,
      IndexName: 'UserTypeIndex',
      KeyConditionExpression: 'userType = :userType',
      ExpressionAttributeValues: {
        ':userType': userType,
      },
    }));
    return response.Items as User[] || [];
  } catch (error) {
    console.error('Error querying users by type:', error);
    throw error;
  }
}

// Booking Operations
export async function createBooking(bookingData: Omit<Booking, 'bookingId' | 'createdAt'>): Promise<Booking> {
  const timestamp = new Date().toISOString();
  const booking = {
    ...bookingData,
    bookingId: `booking_${Date.now()}`,
    createdAt: timestamp,
  };

  try {
    await docClient.send(new PutCommand({
      TableName: BOOKINGS_TABLE,
      Item: booking,
    }));
    return booking as Booking;
  } catch (error) {
    console.error('Error creating booking:', error);
    throw error;
  }
}

export async function getBookingsByUser(userId: string): Promise<Booking[]> {
  try {
    const response = await docClient.send(new QueryCommand({
      TableName: BOOKINGS_TABLE,
      IndexName: 'UserBookingsIndex',
      KeyConditionExpression: 'userId = :userId',
      ExpressionAttributeValues: {
        ':userId': userId,
      },
    }));
    return response.Items as Booking[] || [];
  } catch (error) {
    console.error('Error getting user bookings:', error);
    throw error;
  }
}

export async function getBookingsByCoach(coachId: string): Promise<Booking[]> {
  try {
    const response = await docClient.send(new QueryCommand({
      TableName: BOOKINGS_TABLE,
      IndexName: 'CoachBookingsIndex',
      KeyConditionExpression: 'coachId = :coachId',
      ExpressionAttributeValues: {
        ':coachId': coachId,
      },
    }));
    return response.Items as Booking[] || [];
  } catch (error) {
    console.error('Error getting coach bookings:', error);
    throw error;
  }
}

// Course Operations
export async function createCourse(courseData: Omit<Course, 'courseId' | 'createdAt' | 'updatedAt'>): Promise<Course> {
  const timestamp = new Date().toISOString();
  const course = {
    ...courseData,
    courseId: `course_${Date.now()}`,
    createdAt: timestamp,
    updatedAt: timestamp,
    enrolledStudents: 0,
    rating: 0,
    totalReviews: 0,
  };

  try {
    await docClient.send(new PutCommand({
      TableName: COURSES_TABLE,
      Item: course,
    }));
    return course as Course;
  } catch (error) {
    console.error('Error creating course:', error);
    throw error;
  }
}

export async function getCourseById(courseId: string): Promise<Course | null> {
  try {
    const response = await docClient.send(new GetCommand({
      TableName: COURSES_TABLE,
      Key: { courseId },
    }));
    return response.Item as Course || null;
  } catch (error) {
    console.error('Error getting course:', error);
    throw error;
  }
}

export async function getCoursesByCoach(coachId: string): Promise<Course[]> {
  try {
    const response = await docClient.send(new QueryCommand({
      TableName: COURSES_TABLE,
      IndexName: 'CoachCoursesIndex',
      KeyConditionExpression: 'coachId = :coachId',
      ExpressionAttributeValues: {
        ':coachId': coachId,
      },
    }));
    return response.Items as Course[] || [];
  } catch (error) {
    console.error('Error getting coach courses:', error);
    throw error;
  }
} 