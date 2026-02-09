# Database Seeding Guide

This guide explains how to seed your Kitput database with sample data.

## What's Included

The seed script creates:

### 👥 Users (3)
- **Admin User** - admin@kitput.com (password: admin123)
- **John Doe** - john@example.com (password: admin123)
- **Jane Smith** - jane@example.com (password: admin123)

### 📂 Categories (3)
- **T-Shirts** - Comfortable and stylish t-shirts
- **Jeans** - Premium quality denim jeans
- **Shoes** - Trendy and comfortable footwear

### 📦 Products (6)
#### T-Shirts Category:
1. Classic White T-Shirt - $29.99 (100 in stock)
2. Graphic Print T-Shirt - $34.99 (75 in stock)

#### Jeans Category:
3. Slim Fit Denim Jeans - $79.99 (60 in stock)
4. Classic Blue Jeans - $69.99 (85 in stock)

#### Shoes Category:
5. Urban Sneakers - $89.99 (50 in stock)
6. Sport Running Shoes - $109.99 (45 in stock)

### ⭐ Reviews (4)
Sample reviews from users on various products

### 📍 Addresses (2)
Default shipping addresses for regular users

## How to Run

### Prerequisites
1. Make sure you have a PostgreSQL database running
2. Your `.env` file should have a valid `DATABASE_URL`
3. Run migrations first if you haven't already

### Steps

1. **Install dependencies** (if not already installed):
```bash
npm install
```

2. **Run migrations** (if not already done):
```bash
npx prisma migrate dev
```

3. **Run the seed script**:
```bash
npm run prisma:seed
```

Or using Prisma CLI directly:
```bash
npx prisma db seed
```

## What the Seed Does

1. **Cleans existing data** - Removes all existing records (optional, can be commented out)
2. **Creates users** - Including admin and regular users
3. **Creates categories** - T-Shirts, Jeans, and Shoes with images
4. **Creates products** - 2 products per category with images
5. **Creates reviews** - Sample reviews from users
6. **Creates addresses** - Default shipping addresses

## Images Used

All images are sourced from `/public/images/`:
- Category images: `c-tshirts.jpg`, `c-jeans.jpg`, `c-shoes.jpg`
- Product images: `p11-1.jpg`, `p11-2.jpg`, `p12-1.jpg`, etc.
- User avatars: `banner1.jpg`, `banner2.jpg`, `banner3.jpg`

## Notes

- Passwords are hashed using bcrypt (all test accounts use: `admin123`)
- The script will clean existing data before seeding (can be modified)
- All timestamps are automatically set by Prisma
- You can run the seed multiple times (it cleans data first)

## Customization

To customize the seed data:
1. Edit `prisma/seed.ts`
2. Modify the data objects for users, categories, or products
3. Add more products or categories as needed
4. Run the seed script again

## Troubleshooting

**Error: Table doesn't exist**
- Run `npx prisma migrate dev` first

**Error: Connection refused**
- Check your `DATABASE_URL` in `.env`
- Make sure PostgreSQL is running

**Error: tsx not found**
- Run `npm install` to install dependencies

