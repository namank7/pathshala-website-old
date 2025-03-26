export interface BaseUser {
  userId: string
  email: string
  name: string
  userType: 'student' | 'coach' | 'admin'
  createdAt: string
  updatedAt: string
  profilePicture?: string
}

export interface Student extends BaseUser {
  userType: 'student'
  interestedCourses?: string[]
  educationLevel?: string
  preferences?: {
    subjects?: string[]
    learningStyle?: string
    goals?: string[]
  }
}

export interface Coach extends BaseUser {
  userType: 'coach'
  specializations: string[]
  qualifications: string[]
  availability?: {
    schedule: {
      day: string
      slots: string[]
    }[]
  }
  rating?: number
  totalReviews?: number
}

export interface Admin extends BaseUser {
  userType: 'admin'
  permissions: string[]
}

export type User = Student | Coach | Admin

export interface Booking {
  bookingId: string
  userId: string
  coachId: string
  serviceType: string
  dateTime: string
  status: 'scheduled' | 'completed' | 'cancelled' | 'pending'
  createdAt: string
  notes?: string
}

export interface Course {
  courseId: string
  title: string
  description: string
  coachId: string
  price: number
  createdAt: string
  updatedAt: string
  status: 'active' | 'draft' | 'archived'
  category: string
  duration: number
  enrolledStudents?: number
  rating?: number
  totalReviews?: number
} 