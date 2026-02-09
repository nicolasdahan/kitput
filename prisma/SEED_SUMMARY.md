# 🌱 Seed Data Summary

## Quick Reference

### 🔐 Test Accounts

| Role  | Email              | Password  |
|-------|-------------------|-----------|
| Admin | admin@kitput.com  | admin123  |
| User  | john@example.com  | admin123  |
| User  | jane@example.com  | admin123  |

---

## 📂 Categories & Products

### 👕 T-Shirts (`/images/c-tshirts.jpg`)
1. **Classic White T-Shirt** - $29.99
   - Images: `p11-1.jpg`, `p11-2.jpg`
   - Stock: 100 units
   - Description: Premium cotton, perfect for casual wear

2. **Graphic Print T-Shirt** - $34.99
   - Images: `p12-1.jpg`, `p12-2.jpg`
   - Stock: 75 units
   - Description: Trendy graphic print, soft and comfortable

---

### 👖 Jeans (`/images/c-jeans.jpg`)
3. **Slim Fit Denim Jeans** - $79.99
   - Images: `p21-1.jpg`, `p21-2.jpg`
   - Stock: 60 units
   - Description: Modern slim fit with stretch denim

4. **Classic Blue Jeans** - $69.99
   - Images: `p22-1.jpg`, `p22-2.jpg`
   - Stock: 85 units
   - Description: Traditional blue jeans, timeless style

---

### 👟 Shoes (`/images/c-shoes.jpg`)
5. **Urban Sneakers** - $89.99
   - Images: `p31-1.jpg`, `p31-2.jpg`
   - Stock: 50 units
   - Description: Comfortable everyday sneakers

6. **Sport Running Shoes** - $109.99
   - Images: `p32-1.jpg`, `p32-2.jpg`
   - Stock: 45 units
   - Description: High-performance running shoes

---

## ⭐ Sample Reviews
- 5-star review on Classic White T-Shirt
- 4-star review on Slim Fit Denim Jeans
- 5-star review on Urban Sneakers
- 4-star review on Graphic Print T-Shirt

---

## 📊 Statistics
- **Total Products**: 6
- **Total Categories**: 3
- **Total Users**: 3 (1 admin, 2 regular)
- **Total Reviews**: 4
- **Total Stock**: 415 units
- **Price Range**: $29.99 - $109.99
- **Average Price**: $69.16

---

## 🚀 Run the Seed

```bash
npm run prisma:seed
```

or

```bash
npx prisma db seed
```

