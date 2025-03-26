"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/contexts/auth-context"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Camera, Plus, Trash, Loader2 } from "lucide-react"
import { toast } from "sonner"
import { UserData, updateUserInDynamoDB, UserAttributes } from "@/app/actions/auth-actions"
import { uploadImageToS3 } from "@/lib/image-upload"

export default function ProfilePage() {
  const { user, updateUserAttributes } = useAuth()
  const userData = user as UserData
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [profileImage, setProfileImage] = useState<string | undefined>(userData?.picture || undefined)
  const [formData, setFormData] = useState({
    name: userData?.name || "",
    phone_number: userData?.phone_number || "",
    dateOfBirth: userData?.dateOfBirth || "",
    gender: userData?.gender || "",
    // Address
    street: userData?.address?.street || "",
    city: userData?.address?.city || "",
    state: userData?.address?.state || "",
    country: userData?.address?.country || "",
    postalCode: userData?.address?.postalCode || "",
    // Education
    currentLevel: userData?.education?.currentLevel || "",
    school: userData?.education?.school || "",
    graduationYear: userData?.education?.graduationYear || "",
    major: userData?.education?.major || "",
    gpa: userData?.education?.gpa || "",
    // Other fields
    bio: userData?.bio || "",
    interests: userData?.interests?.join(", ") || "",
    // Social links
    linkedin: userData?.socialLinks?.linkedin || "",
    twitter: userData?.socialLinks?.twitter || "",
    github: userData?.socialLinks?.github || "",
  })

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file || !user?.userId) return

    try {
      setIsLoading(true)
      
      // Upload to S3 and get URLs
      const { thumbnailUrl, fullImageUrl } = await uploadImageToS3(file, user.userId)
      
      // Update state with the full image URL
      setProfileImage(fullImageUrl)
      
      // Update Cognito with the thumbnail URL
      await updateUserAttributes({
        picture: thumbnailUrl
      })
      
      toast.success("Profile picture updated successfully")
    } catch (error) {
      console.error("Error uploading image:", error)
      toast.error("Failed to upload image. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value } = e.target
    setFormData(prev => ({
      ...prev,
      [id]: value
    }))
  }

  const handleSave = async () => {
    try {
      setIsLoading(true)
      
      // Update Cognito attributes (only the ones Cognito supports)
      const cognitoAttributes: Partial<UserAttributes> = {
        name: formData.name,
        phone_number: formData.phone_number,
      }
      
      // Only include picture if it's small enough
      if (profileImage && profileImage.length <= 131072) {
        cognitoAttributes.picture = profileImage
      }
      
      await updateUserAttributes(cognitoAttributes)

      // Update DynamoDB with all fields
      const dynamoData: UserData = {
        ...userData,
        name: formData.name,
        phone_number: formData.phone_number,
        picture: profileImage, // DynamoDB can handle the full-size image
        dateOfBirth: formData.dateOfBirth,
        gender: formData.gender,
        address: {
          street: formData.street,
          city: formData.city,
          state: formData.state,
          country: formData.country,
          postalCode: formData.postalCode,
        },
        education: {
          currentLevel: formData.currentLevel,
          school: formData.school,
          graduationYear: formData.graduationYear,
          major: formData.major,
          gpa: formData.gpa,
        },
        bio: formData.bio,
        interests: formData.interests.split(",").map(i => i.trim()).filter(i => i),
        socialLinks: {
          linkedin: formData.linkedin,
          twitter: formData.twitter,
          github: formData.github,
        },
      }

      // Call DynamoDB update function
      const success = await updateUserInDynamoDB(dynamoData)
      
      if (!success) {
        throw new Error("Failed to update profile in database")
      }

      toast.success("Profile updated successfully", {
        duration: 3000,
        position: "top-right",
      })
      setIsEditing(false)
    } catch (error) {
      console.error("Error updating profile:", error)
      toast.error("Failed to update profile. Please try again.", {
        duration: 5000,
        position: "top-right",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">My Profile</h1>
        <p className="text-gray-400">Manage your personal information and preferences</p>
      </div>

      <div className="grid gap-8 md:grid-cols-12">
        <div className="md:col-span-8 space-y-8">
          <Card className="bg-zinc-900 border-yellow-900/20">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription className="text-gray-400">
                    Your personal details and contact information
                  </CardDescription>
                </div>
                <Button
                  variant="outline"
                  className="border-[#CE8C2C] text-[#CE8C2C] hover:bg-[#CE8C2C]/10 disabled:opacity-50"
                  onClick={() => {
                    if (isEditing) {
                      handleSave()
                    } else {
                      setIsEditing(true)
                    }
                  }}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : isEditing ? (
                    "Save Changes"
                  ) : (
                    "Edit Profile"
                  )}
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="bg-zinc-800/50"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={user?.email || ""}
                    disabled
                    className="bg-zinc-800/50"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone_number">Phone Number</Label>
                  <Input
                    id="phone_number"
                    type="tel"
                    value={formData.phone_number}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="bg-zinc-800/50"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="userType">User Type</Label>
                  <Input
                    id="userType"
                    value={user?.userType || ""}
                    disabled
                    className="bg-zinc-800/50"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-zinc-900 border-yellow-900/20">
            <CardHeader>
              <CardTitle>Address Information</CardTitle>
              <CardDescription className="text-gray-400">
                Your residential and mailing address
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <Label htmlFor="street">Street Address</Label>
                  <Textarea
                    id="street"
                    placeholder="Enter your street address"
                    value={formData.street}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="bg-zinc-800/50 min-h-[80px]"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      placeholder="Enter city"
                      value={formData.city}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="bg-zinc-800/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state">State/Province</Label>
                    <Input
                      id="state"
                      placeholder="Enter state"
                      value={formData.state}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="bg-zinc-800/50"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="country">Country</Label>
                    <Select 
                      disabled={!isEditing} 
                      value={formData.country}
                      onValueChange={(value) => handleInputChange({ target: { id: 'country', value } } as any)}
                    >
                      <SelectTrigger className="bg-zinc-800/50">
                        <SelectValue placeholder="Select country" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="in">India</SelectItem>
                        <SelectItem value="us">United States</SelectItem>
                        <SelectItem value="ca">Canada</SelectItem>
                        <SelectItem value="uk">United Kingdom</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="postalCode">ZIP/Postal Code</Label>
                    <Input
                      id="postalCode"
                      placeholder="Enter ZIP code"
                      value={formData.postalCode}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="bg-zinc-800/50"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-zinc-900 border-yellow-900/20">
            <CardHeader>
              <CardTitle>Education Background</CardTitle>
              <CardDescription className="text-gray-400">
                Your academic history and qualifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <Label htmlFor="currentLevel">Current/Latest Education</Label>
                  <Select 
                    disabled={!isEditing}
                    value={formData.currentLevel}
                    onValueChange={(value) => handleInputChange({ target: { id: 'currentLevel', value } } as any)}
                  >
                    <SelectTrigger className="bg-zinc-800/50">
                      <SelectValue placeholder="Select education level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high-school">High School</SelectItem>
                      <SelectItem value="bachelors">Bachelor's Degree</SelectItem>
                      <SelectItem value="masters">Master's Degree</SelectItem>
                      <SelectItem value="phd">Ph.D.</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="school">Institution Name</Label>
                  <Input
                    id="school"
                    placeholder="Enter institution name"
                    value={formData.school}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="bg-zinc-800/50"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="major">Field of Study</Label>
                    <Input
                      id="major"
                      placeholder="Enter field of study"
                      value={formData.major}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="bg-zinc-800/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="graduationYear">Graduation Year</Label>
                    <Input
                      id="graduationYear"
                      type="number"
                      placeholder="YYYY"
                      value={formData.graduationYear}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="bg-zinc-800/50"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gpa">GPA</Label>
                  <Input
                    id="gpa"
                    type="number"
                    placeholder="Enter GPA"
                    value={formData.gpa}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="bg-zinc-800/50"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-zinc-900 border-yellow-900/20">
            <CardHeader>
              <CardTitle>Other Information</CardTitle>
              <CardDescription className="text-gray-400">
                Additional information about you
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="dateOfBirth">Date of Birth</Label>
                <Input
                  id="dateOfBirth"
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="bg-zinc-800/50"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="gender">Gender</Label>
                <Select 
                  disabled={!isEditing}
                  value={formData.gender}
                  onValueChange={(value) => handleInputChange({ target: { id: 'gender', value } } as any)}
                >
                  <SelectTrigger className="bg-zinc-800/50">
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  placeholder="Enter a brief bio about yourself"
                  value={formData.bio}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="bg-zinc-800/50 min-h-[80px]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="interests">Interests</Label>
                <Textarea
                  id="interests"
                  placeholder="Enter your interests separated by commas"
                  value={formData.interests}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="bg-zinc-800/50 min-h-[80px]"
                />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-zinc-900 border-yellow-900/20">
            <CardHeader>
              <CardTitle>Social Links</CardTitle>
              <CardDescription className="text-gray-400">
                Your social media profiles
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="linkedin">LinkedIn</Label>
                <Input
                  id="linkedin"
                  placeholder="Enter your LinkedIn profile URL"
                  value={formData.linkedin}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="bg-zinc-800/50"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="twitter">Twitter</Label>
                <Input
                  id="twitter"
                  placeholder="Enter your Twitter profile URL"
                  value={formData.twitter}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="bg-zinc-800/50"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="github">GitHub</Label>
                <Input
                  id="github"
                  placeholder="Enter your GitHub profile URL"
                  value={formData.github}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="bg-zinc-800/50"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-4 space-y-8">
          <Card className="bg-zinc-900 border-yellow-900/20">
            <CardHeader>
              <CardTitle>Profile Picture</CardTitle>
              <CardDescription className="text-gray-400">
                Upload a profile picture to personalize your account
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="relative w-48 h-48 mx-auto">
                <div className={`w-full h-full rounded-full overflow-hidden border-2 ${isEditing ? 'border-[#CE8C2C]' : 'border-zinc-800'}`}>
                  {profileImage ? (
                    <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-zinc-800 flex items-center justify-center">
                      <Camera className="w-12 h-12 text-zinc-600" />
                    </div>
                  )}
                </div>
                {isEditing && (
                  <div className="absolute bottom-2 right-2 flex gap-2">
                    <label
                      htmlFor="picture-upload"
                      className="p-2 rounded-full bg-[#CE8C2C] text-black cursor-pointer hover:bg-[#CE8C2C]/80"
                    >
                      <Plus className="w-4 h-4" />
                      <input
                        type="file"
                        id="picture-upload"
                        className="hidden"
                        accept="image/*"
                        onChange={handleImageUpload}
                      />
                    </label>
                    {profileImage && (
                      <button
                        onClick={() => setProfileImage(undefined)}
                        className="p-2 rounded-full bg-red-500 text-white hover:bg-red-600"
                      >
                        <Trash className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-zinc-900 border-yellow-900/20">
            <CardHeader>
              <CardTitle>Account Security</CardTitle>
              <CardDescription className="text-gray-400">
                Manage your password and security settings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                variant="outline"
                className="border-[#CE8C2C] text-[#CE8C2C] hover:bg-[#CE8C2C]/10"
              >
                Change Password
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
} 