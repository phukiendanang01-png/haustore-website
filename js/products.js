const PRODUCTS = [
    {
        id: 1,
        name: "iPhone 16 Pro Max",
        category: "phone",
        specs: "256GB | Titan tự nhiên",
        price: 34990000,
        image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-pro-finish-select-202409-6-7inch-naturaltitanium?wid=400&hei=400"
    },
    {
        id: 2,
        name: "iPhone 16 Pro",
        category: "phone",
        specs: "128GB | Titan đen",
        price: 28990000,
        image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-pro-finish-select-202409-6-3inch-blacktitanium?wid=400&hei=400"
    },
    {
        id: 3,
        name: "iPhone 16",
        category: "phone",
        specs: "128GB | Xanh lưu ly",
        price: 22990000,
        image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-finish-select-202409-6-1inch-ultramarine?wid=400&hei=400"
    },
    {
        id: 4,
        name: "Samsung Galaxy S25 Ultra",
        category: "phone",
        specs: "256GB | Titan đen",
        price: 33990000,
        image: "https://images.samsung.com/is/image/samsung/p6pim/vn/2501/gallery/vn-galaxy-s25-ultra-s938-504843-thumb-544176105?$400_400_PNG$"
    },
    {
        id: 5,
        name: "Xiaomi 15 Ultra",
        category: "phone",
        specs: "512GB | Đen",
        price: 24990000,
        image: "https://i02.appmifile.com/images/2025/02/27/4f9b0f6a-0b3a-4b8a-8b0a-0b3a4b8a8b0a.png"
    },
    {
        id: 6,
        name: "OPPO Find X8 Pro",
        category: "phone",
        specs: "256GB | Space Black",
        price: 22990000,
        image: "https://image.oppo.com/content/dam/oppo/common/mkt/vn-ec/v2/find-x8-pro/navigation/find-x8-pro-black.png"
    },
    {
        id: 7,
        name: "Tai nghe AirPods Pro 2",
        category: "accessory",
        specs: "USB-C | Chống ồn chủ động",
        price: 6490000,
        image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MQD83?wid=400&hei=400"
    },
    {
        id: 8,
        name: "Ốp lưng MagSafe iPhone 16 Pro",
        category: "accessory",
        specs: "Chính hãng Apple",
        price: 1490000,
        image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MPUF3?wid=400&hei=400"
    },
    {
        id: 9,
        name: "Cường lực iPhone 16 Pro Max",
        category: "accessory",
        specs: "Kính cường lực 9H",
        price: 150000,
        image: "https://via.placeholder.com/400x400/f5f5f7/d2d2d7?text=C%C6%B0%E1%BB%9Dng+l%E1%BB%B1c"
    },
    {
        id: 10,
        name: "Sạc nhanh 65W Type-C",
        category: "accessory",
        specs: "PD 65W | GaN",
        price: 450000,
        image: "https://via.placeholder.com/400x400/f5f5f7/d2d2d7?text=S%E1%BA%A1c+65W"
    }
];

// Format price to VND
function formatPrice(price) {
    return new Intl.NumberFormat('vi-VN').format(price) + '₫';
}
