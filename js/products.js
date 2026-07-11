const PRODUCTS = [
 {
 id: 1,
 name: "OPPO Pad Mini 256G Fullbox",
 category: "phone",
 specs: "256GB | Màu Xám",
 price: 11750000,
 image: "images/oppo-pad-1.jpg"
 },
 {
 id: 2,
 name: "iPhone 11 VN/A 64G Zin 100%",
 category: "phone",
 specs: "64GB | Trắng",
 price: 3900000,
 image: ""
 }
];

function formatPrice(price) {
 return new Intl.NumberFormat("vi-VN").format(price) + "₫";
}
