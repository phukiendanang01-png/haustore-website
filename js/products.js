const PRODUCTS = [
 {
 id: 1,
 name: "OPPO Pad Mini 256G Fullbox",
 category: "phone",
 specs: "256GB | Màu Xám",
 price: 11750000,
 image: "images/oppo-pad-1.jpg",
 images: [
   "images/oppo-pad-1.jpg",
   "images/oppo-pad-2.jpg",
   "images/oppo-pad-3.jpg",
   "images/oppo-pad-4.jpg",
   "images/oppo-pad-5.jpg"
 ],
 description: "OPPO Pad Mini 256GB Fullbox - Máy tính bảng chính hãng, thiết kế mỏng nhẹ, màn hình sắc nét, hiệu năng mạnh mẽ. Phù hợp cho giải trí và làm việc."
 },
 {
 id: 2,
 name: "iPhone 11 VN/A 64G Zin 100%",
 category: "phone",
 specs: "64GB | Trắng",
 price: 3900000,
 image: "images/iphone11-1.jpg",
 images: [
   "images/iphone11-1.jpg",
   "images/iphone11-2.jpg",
   "images/iphone11-3.jpg",
   "images/iphone11-4.jpg",
   "images/iphone11-5.jpg",
   "images/iphone11-6.jpg",
   "images/iphone11-7.jpg",
   "images/iphone11-8.jpg",
   "images/iphone11-9.jpg"
 ],
 description: "iPhone 11 VN/A 64GB Zin 100% - Chính hãng Apple Việt Nam, máy đẹp như mới, pin tốt, camera kép 12MP, chip A13 Bionic mạnh mẽ. Bảo hành 12 tháng."
 }
];

function formatPrice(price) {
 return new Intl.NumberFormat("vi-VN").format(price) + "₫";
}
