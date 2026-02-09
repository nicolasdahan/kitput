import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';
import { hash } from 'bcrypt';

// Créer un pool de connexion PostgreSQL
const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });

// Créer l'adapter
const adapter = new PrismaPg(pool);

// Initialiser PrismaClient avec l'adapter
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('🌱 Starting database seed...');
  

  // Clean existing data (optional - remove if you want to keep existing data)
  console.log('🧹 Cleaning existing data...');
  await prisma.review.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.address.deleteMany();
  await prisma.cartItem.deleteMany();
  await prisma.cart.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.account.deleteMany();
  await prisma.session.deleteMany();
  await prisma.user.deleteMany();

  // Create Users
  console.log('👥 Creating users...');
  const defaultPassword = await hash('admin123', 10);
  const adminUser = await prisma.user.create({
    data: {
      name: 'Admin User',
      email: 'admin@kitput.com',
      password: defaultPassword,
      role: 'ADMIN',
      image: '/images/banner1.jpg',
    },
  });

  const regularUser = await prisma.user.create({
    data: {
      name: 'John Doe',
      email: 'john@example.com',
      password: defaultPassword,
      role: 'USER',
      image: '/images/banner2.jpg',
    },
  });

  const customerUser = await prisma.user.create({
    data: {
      name: 'Jane Smith',
      email: 'jane@example.com',
      password: defaultPassword,
      role: 'USER',
      image: '/images/banner3.jpg',
    },
  });

  console.log(`✅ Created ${3} users`);

  // Create Categories
  console.log('📂 Creating categories...');
  const tshirtsCategory = await prisma.category.create({
    data: {
      name: 'T-Shirts',
      description: 'Comfortable and stylish t-shirts for everyday wear',
      image: '/images/c-tshirts.jpg',
    },
  });

  const jeansCategory = await prisma.category.create({
    data: {
      name: 'Jeans',
      description: 'Premium quality denim jeans for all occasions',
      image: '/images/c-jeans.jpg',
    },
  });

  const shoesCategory = await prisma.category.create({
    data: {
      name: 'Shoes',
      description: 'Trendy and comfortable footwear for every style',
      image: '/images/c-shoes.jpg',
    },
  });

  console.log(`✅ Created ${3} categories`);

  // Create Products
  console.log('📦 Creating products...');

  // T-Shirts Products
  const tshirt1 = await prisma.product.create({
    data: {
      name: 'Classic White T-Shirt',
      description: 'A timeless white t-shirt made from 100% premium cotton. Perfect for any casual occasion.',
      price: 29.99,
      stock: 100,
      categoryId: tshirtsCategory.id,
      images: ['/images/p11-1.jpg', '/images/p11-2.jpg'],
    },
  });

  const tshirt2 = await prisma.product.create({
    data: {
      name: 'Graphic Print T-Shirt',
      description: 'Stand out with this trendy graphic print t-shirt. Soft, comfortable, and stylish.',
      price: 34.99,
      stock: 75,
      categoryId: tshirtsCategory.id,
      images: ['/images/p12-1.jpg', '/images/p12-2.jpg'],
    },
  });

  // Jeans Products
  const jeans1 = await prisma.product.create({
    data: {
      name: 'Slim Fit Denim Jeans',
      description: 'Modern slim fit jeans with a sleek silhouette. Made from premium stretch denim for ultimate comfort.',
      price: 79.99,
      stock: 60,
      categoryId: jeansCategory.id,
      images: ['/images/p21-1.jpg', '/images/p21-2.jpg'],
    },
  });

  const jeans2 = await prisma.product.create({
    data: {
      name: 'Classic Blue Jeans',
      description: 'Traditional blue jeans with a regular fit. A wardrobe essential that never goes out of style.',
      price: 69.99,
      stock: 85,
      categoryId: jeansCategory.id,
      images: ['/images/p22-1.jpg', '/images/p22-2.jpg'],
    },
  });

  // Shoes Products
  const shoes1 = await prisma.product.create({
    data: {
      name: 'Urban Sneakers',
      description: 'Comfortable urban sneakers perfect for everyday wear. Features cushioned insole and breathable material.',
      price: 89.99,
      stock: 50,
      categoryId: shoesCategory.id,
      images: ['/images/p31-1.jpg', '/images/p31-2.jpg'],
    },
  });

  const shoes2 = await prisma.product.create({
    data: {
      name: 'Sport Running Shoes',
      description: 'High-performance running shoes with advanced cushioning technology. Lightweight and durable.',
      price: 109.99,
      stock: 45,
      categoryId: shoesCategory.id,
      images: ['/images/p32-1.jpg', '/images/p32-2.jpg'],
    },
  });

  console.log(`✅ Created ${6} products`);

  // Create some reviews
  console.log('⭐ Creating reviews...');
  await prisma.review.create({
    data: {
      rating: 5,
      comment: 'Excellent quality! The fabric is soft and the fit is perfect.',
      userId: regularUser.id,
      productId: tshirt1.id,
    },
  });

  await prisma.review.create({
    data: {
      rating: 4,
      comment: 'Great jeans, very comfortable. Would recommend!',
      userId: customerUser.id,
      productId: jeans1.id,
    },
  });

  await prisma.review.create({
    data: {
      rating: 5,
      comment: 'Best sneakers I\'ve ever owned. Super comfortable for all-day wear.',
      userId: regularUser.id,
      productId: shoes1.id,
    },
  });

  await prisma.review.create({
    data: {
      rating: 4,
      comment: 'Nice graphic design and good quality material.',
      userId: customerUser.id,
      productId: tshirt2.id,
    },
  });

  console.log(`✅ Created ${4} reviews`);

  // Create addresses for users
  console.log('📍 Creating addresses...');
  await prisma.address.create({
    data: {
      userId: regularUser.id,
      street: '123 Main Street',
      city: 'New York',
      state: 'NY',
      postalCode: '10001',
      country: 'USA',
      isDefault: true,
    },
  });

  await prisma.address.create({
    data: {
      userId: customerUser.id,
      street: '456 Oak Avenue',
      city: 'Los Angeles',
      state: 'CA',
      postalCode: '90001',
      country: 'USA',
      isDefault: true,
    },
  });

  console.log(`✅ Created ${2} addresses`);

  console.log('✨ Database seeding completed successfully!');
  console.log('\n📊 Summary:');
  console.log(`   - Users: ${3}`);
  console.log(`   - Categories: ${3}`);
  console.log(`   - Products: ${6}`);
  console.log(`   - Reviews: ${4}`);
  console.log(`   - Addresses: ${2}`);
  console.log('\n🔐 Test credentials:');
  console.log('   Admin: admin@kitput.com / admin123');
  console.log('   User: john@example.com / admin123');
  console.log('   User: jane@example.com / admin123');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

