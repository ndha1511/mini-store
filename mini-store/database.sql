create database ministore;

use ministore;

create table users(
    id int primary key auto_increment,
    fullname varchar(100) default '',
    phone_number varchar(10) not null,
    address varchar(200) default '',
    password varchar(100) not null default '',
    created_at datetime,
    updated_at datetime,
    is_active tinyint(1) default 1,
    date_of_birth date,
    facebook_account_id int default 0,
    google_account_id int default 0
);



create table roles(
    id int primary key,
    name varchar(20) not null
);

alter table users add column role_id int;
alter table users add foreign key (role_id) references roles(id);

create table tokens(
    id int primary key auto_increment,
    token varchar(255) unique not null,
    token_type varchar(50) not null,
    expiration_date datetime,
    revoked tinyint(1) not null,
    expired tinyint(1) not null,
    user_id int,
    foreign key (user_id) references users(id)
);

-- đăng nhập bằng facebook hoặc google
create table social_accounts(
    id int primary key auto_increment,
    provider varchar(20) not null comment 'tên nhà cung cấp',
    provider_id varchar(50) not null,
    email varchar(150) not null comment 'email',
    name varchar(100) not null comment 'tên người dùng',
    user_id int,
    foreign key (user_id) references users(id)
);

create table categories(
    id int primary key auto_increment,
    name varchar(100) not null default '' comment 'tên danh mục, vd: đồ điện tử'
);

create table products(
    id int primary key auto_increment,
    name varchar(350) comment 'tên sản phẩm',
    price float not null check ( price >= 0 ),
    thumbnail varchar(300) default '',
    description longtext,
    created_at datetime,
    updated_at datetime,
    category_id int,
    foreign key (category_id) references categories(id)
);

create table orders(
    id int primary key auto_increment,
    user_id int,
    foreign key (user_id) references users(id),
    fullname varchar(100) default '',
    email varchar(100) default '',
    phone_number varchar(20) not null,
    address varchar(200) not null,
    note varchar(100) default '',
    order_date datetime default current_timestamp,
    status varchar(20),
    total_money float check ( total_money >= 0 ),
    shipping_method varchar(100),
    shipping_address varchar(200),
    shipping_date date,
    tracking_number varchar(100),
    payment_method varchar(100),
    active tinyint(1)
);
alter table orders modify column status enum('pending', 'processing', 'shipped', 'delivered', 'cancelled')
comment 'trạng thái đơn hàng';

create table order_details(
    id int primary key auto_increment,
    order_id int,
    foreign key (order_id) references orders(id),
    product_id int,
    foreign key (product_id) references products(id),
    price float check ( price >= 0 ),
    number_of_products int check ( number_of_products > 0 ),
    total_money float check ( total_money >= 0 ),
    color varchar(20) default ''
);

CREATE TABLE product_images(
	id INT PRIMARY KEY AUTO_INCREMENT, 
	product_id INT,
	FOREIGN KEY (product_id) REFERENCES products(id),
	CONSTRAINT fk_product_images_product_id
		FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE 
);

ALTER TABLE product_images ADD COLUMN image_url VARCHAR(300);

alter table product_images add column public_id varchar(255);

SET NAMES 'utf8mb4';
SET CHARACTER SET utf8mb4;

-- Dumping data for table saledb.categories: ~4 rows (approximately)
INSERT INTO `categories` (`id`, `name`) VALUES
	(2, 'Đồ điện tử'),
	(3, 'Đồ gia dụng'),
	(4, 'Quần áo'),
	(5, 'Bánh kẹo');

-- Dumping data for table saledb.products: ~17 rows (approximately)
INSERT INTO `products` (`id`, `name`, `price`, `thumbnail`, `description`, `created_at`, `updated_at`, `category_id`) VALUES
	(3014, 'Dép đi trong nhà', 30000, 'http://res.cloudinary.com/ddzibjsaq/image/upload/v1708248657/z3aa8agnkpd4bv65ploe.jpg', 'Dép dùng để đi trong nhà thời trang', '2024-02-18 16:32:03', '2024-02-18 16:32:03', 3),
	(3015, 'Điện thoại iphone 14', 10000000, 'http://res.cloudinary.com/ddzibjsaq/image/upload/v1708248785/llfayz55ryc23q4x3mz6.jpg', 'Điện thoại iphone 14 có ch play chơi game cực mượt', '2024-02-18 16:34:27', '2024-02-18 16:34:27', 2),
	(3016, 'Bàn chải điện tử ', 1500000, 'http://res.cloudinary.com/ddzibjsaq/image/upload/v1708248880/hoqefmbvtlfhyjcfaiwp.jpg', 'Bàn chải điện tử đánh răng siêu sạch', '2024-02-18 16:35:15', '2024-02-18 16:35:15', 2),
	(3017, 'Ốp lưng điện thoại cute', 30000, 'http://res.cloudinary.com/ddzibjsaq/image/upload/v1708248956/a3enanmvcxhufkyt6a9v.jpg', 'Ốp lưng điện thoại ', '2024-02-18 16:36:40', '2024-02-18 16:36:40', 2),
	(3018, 'Bút màu 64 màu', 150000, 'http://res.cloudinary.com/ddzibjsaq/image/upload/v1708249030/urtysfphvmmmddxmdcxr.jpg', 'Bút màu có 64 màu sản xuất tại trung quốc', '2024-02-18 16:37:50', '2024-02-18 16:37:50', 3),
	(3019, 'Mắt kính gọng kim loại', 250000, 'http://res.cloudinary.com/ddzibjsaq/image/upload/v1708249084/gplcd9iw9cfx7if31f7a.jpg', 'Kính gọng kim loại', '2024-02-18 16:38:30', '2024-02-18 16:38:30', 3),
	(3020, 'Headphone gấu cute nhiều màu sắc', 50000, 'http://res.cloudinary.com/ddzibjsaq/image/upload/v1708249135/qr0hyvgen0zjt48gkyt9.jpg', 'Có nhiều màu sắc tha hồ lựa chọn, bảo hành 12 tháng 1 đổi 1 free ship', '2024-02-18 16:41:13', '2024-02-18 16:41:13', 2),
	(3021, 'Móc khóa thỏ cute', 15000, 'http://res.cloudinary.com/ddzibjsaq/image/upload/v1708249321/kz8w1nqshzne5qb0axgg.jpg', 'móc khóa hình thỏ', '2024-02-18 16:42:43', '2024-02-18 16:42:43', 3),
	(3022, 'Cà chua bi ', 20000, 'http://res.cloudinary.com/ddzibjsaq/image/upload/v1708249391/xeawxcrywqi3znsjvqox.jpg', 'cà chua bi', '2024-02-18 16:43:36', '2024-02-18 16:43:36', 5),
	(3023, 'Ổ điện 2 chấu chịu nhiệt tốt', 75000, 'http://res.cloudinary.com/ddzibjsaq/image/upload/v1708249438/pvrxuyjfcp42l98ahxk3.jpg', 'Ổ điện 2 chấu chịu nhiệt tốt', '2024-02-18 16:44:41', '2024-02-18 16:44:41', 2),
	(3024, 'Balo học sinh bền đẹp chất lượng cao', 250000, 'http://res.cloudinary.com/ddzibjsaq/image/upload/v1708249604/qud7zkgfojue1jgzzjcp.jpg', 'Balo bền đẹp chât lượng', '2024-02-18 16:47:45', '2024-02-18 16:47:45', 3),
	(3025, 'Thú bông khủng long cute', 1500000, 'http://res.cloudinary.com/ddzibjsaq/image/upload/v1708249719/rmcavviyigewxg0qhfbs.jpg', 'Thú bông khủng long cute', '2024-02-18 16:49:25', '2024-02-18 16:49:25', 3),
	(3026, 'Kệ dép inox', 115000, 'http://res.cloudinary.com/ddzibjsaq/image/upload/v1708249958/viu0lcprbotlvouhomt2.jpg', 'Kê dép inox', '2024-02-18 16:53:05', '2024-02-18 16:53:05', 3),
	(3027, 'Thau nhựa 2l', 50000, 'http://res.cloudinary.com/ddzibjsaq/image/upload/v1708250023/jw4fody1gmhsagc4j783.jpg', 'Thau nhựa ', '2024-02-18 16:54:09', '2024-02-18 16:54:09', 3),
	(3028, 'Ổ điện có chốt an toàn chống giật cho trẻ em', 200000, 'http://res.cloudinary.com/ddzibjsaq/image/upload/v1708250082/t289y0j50mgbcua3izzn.jpg', 'Ổ điện an toàn chống giật', '2024-02-18 16:55:15', '2024-02-18 16:55:15', 2),
	(3029, 'Kệ để laptop, tablet inox', 70000, 'http://res.cloudinary.com/ddzibjsaq/image/upload/v1708250196/pnlszjgqmyzndbow1va1.jpg', 'Kệ laptop tablet', '2024-02-18 16:57:08', '2024-02-18 16:57:08', 2),
	(3030, 'Cat', 70000, 'http://res.cloudinary.com/ddzibjsaq/image/upload/v1708426649/dlzkpedkvputcc7vmrjc.jpg', 'Cat', '2024-02-20 17:57:46', '2024-02-20 17:57:46', 3);

	-- Dumping data for table saledb.roles: ~2 rows (approximately)
INSERT INTO `roles` (`id`, `name`) VALUES
	(1, 'ROLE_USER'),
	(2, 'ROLE_ADMIN');

-- Dumping data for table saledb.social_accounts: ~0 rows (approximately)

-- Dumping data for table saledb.tokens: ~0 rows (approximately)

-- Dumping data for table saledb.users: ~12 rows (approximately)
INSERT INTO `users` (`id`, `fullname`, `phone_number`, `address`, `password`, `created_at`, `updated_at`, `is_active`, `date_of_birth`, `facebook_account_id`, `google_account_id`, `role_id`) VALUES
	(1, 'abc', '011223344', NULL, '$2a$10$/Aw.zylbBTOKstSlVBiaZedkCyL65XKdcbdyrk1DTBEoOP5GQC0yi', '2024-02-05 12:42:19', '2024-02-05 12:42:19', 0, NULL, 0, 0, 1),
	(2, 'abc', '0908765345', NULL, '$2a$10$skFPA2dqDrdOLdBZuIeXeuwfEegJMwHOaJmdEqfa/2Ym.C/oo5AOO', '2024-02-05 16:33:45', '2024-02-05 16:33:45', 0, '2024-02-01', 0, 0, 1),
	(3, 'teo', '099887766', NULL, '$2a$10$Rqrs4W/6zeLkwNYK1cL.f.p4/s0RZ4VDjaZZ/qKygQkh.f0VeaA6O', '2024-02-05 21:10:35', '2024-02-05 21:10:35', 1, '2024-01-31', 0, 0, 1),
	(4, 'ti', '099887765', NULL, '$2a$10$qrnciH07I8bk4fLiUVs.BOsHvCJNaBVjycBlqSP1gsPFIzC3NP0nq', '2024-02-05 21:11:33', '2024-02-05 21:11:33', 1, '2024-01-30', 0, 0, 1),
	(5, 'nguyen van a', '098765442', NULL, '$2a$10$Dfjb2VQ7Z423SdgEDfCpduyr0GAI1XpEC6nu7JogYWlZzUotRtzXO', '2024-02-05 21:14:00', '2024-02-05 21:14:00', 1, '2024-02-01', 0, 0, 1),
	(6, 'nbvc', '1234567', NULL, '$2a$10$fGGH3G9nUe.qBudooBQ1y.RrzF.K954nGhKV8E5c9XZmEGApEj5uy', '2024-02-05 21:16:42', '2024-02-05 21:16:42', 1, '2024-01-30', 0, 0, 1),
	(7, 'fsd', '134121', NULL, '$2a$10$DJKL954XS7rFxpq3iUGOWuPvby29JZwgRmE68Z5zhgkxeD8utlKIi', '2024-02-05 21:18:25', '2024-02-05 21:18:25', 1, '2024-01-31', 0, 0, 1),
	(8, 'erwr', '555522', NULL, '$2a$10$BekcepgGRNtoNTYEtVN4YeCW/9cDm7pxed.rzwyiddjxmw2RMI2Vi', '2024-02-05 21:25:25', '2024-02-05 21:25:25', 1, '2024-01-31', 0, 0, 1),
	(9, 'rewrwe', '543534534', NULL, '$2a$10$KmoqCArIc5f.Tjku6su5muwKFSe8RW7q8smG4NH/Abbq4zp8MGBPm', '2024-02-05 21:26:14', '2024-02-05 21:26:14', 1, '2024-02-22', 0, 0, 1),
	(10, 'rwerewr', '07060505', NULL, '$2a$10$iZ3qM4HBJ2TVEKiNeaPWs.xq6r16boqPfhy.oBL8iYlsNlgJuEFwO', '2024-02-05 21:29:24', '2024-02-05 21:29:24', 1, '2024-01-30', 0, 0, 1),
	(11, 'sdfsd', '4324234', NULL, '$2a$10$bPjOJzFT83skMYLHtDK2LeDr77k.89f.1x/hiMs5wNcxuXxltXaji', '2024-02-05 21:30:07', '2024-02-05 21:30:07', 1, '2024-02-08', 0, 0, 1),
	(12, 'fsdf', '123415625', NULL, '$2a$10$3/T0jqT..J7Io0LU3boeqevrGgaq.o9ERYQHArGOJnqCqS1NmQ1Dm', '2024-02-05 22:14:19', '2024-02-05 22:14:19', 1, '2024-01-29', 0, 0, 1),
	(13, 'admin', 'admin', NULL, '$2a$10$qStxp1xelSptj8UoKidEIur.dYF.h8eT91Cr4M//4xNJiRLzjQAfq', '2024-02-15 16:58:44', '2024-02-15 16:58:44', 1, '2024-02-01', 0, 0, 2);
	
-- Dumping data for table saledb.orders: ~4 rows (approximately)
INSERT INTO `orders` (`id`, `user_id`, `fullname`, `email`, `phone_number`, `address`, `note`, `order_date`, `status`, `total_money`, `shipping_method`, `shipping_address`, `shipping_date`, `tracking_number`, `payment_method`, `active`) VALUES
	(1, 3, 'Nguyen Van Ti', NULL, '0995522242', 'tphcm', 'giao toi nha', '2024-02-19 22:08:46', 'pending', 670000, 'giao hàng nhanh', '123 street abc district bcd city', NULL, NULL, '', 1),
	(2, 3, 'Tran Van Tun', NULL, '099887756', 'vietnam', 'hihi', '2024-02-19 22:10:19', 'pending', 670000, 'giao hàng nhanh', '123 street abc district bcd city', NULL, NULL, 'cod', 1),
	(3, 3, 'Nguyễn Văn Tèo', NULL, '0981972422', 'vietnam ', 'giam 50%', '2024-02-19 22:14:42', 'pending', 670000, 'giao hàng nhanh', '123 street abc district bcd city', NULL, NULL, 'cod', 1),
	(4, 3, 'test', NULL, '099887766', 'vietnam ', '', '2024-02-20 14:51:09', 'pending', 60000, 'giao hàng nhanh', '123 street abc district bcd city', NULL, NULL, 'cod', 1);

-- Dumping data for table saledb.order_details: ~16 rows (approximately)
INSERT INTO `order_details` (`id`, `order_id`, `product_id`, `price`, `number_of_products`, `total_money`, `color`) VALUES
	(1, 1, 3029, 70000, 1, 70000, 'xanh lá'),
	(2, 1, 3027, 50000, 2, 100000, 'đen'),
	(3, 1, 3029, 70000, 2, 70000, 'đen'),
	(4, 1, 3028, 200000, 2, 400000, 'đen'),
	(5, 1, 3021, 15000, 2, 30000, 'đen'),
	(6, 2, 3029, 70000, 1, 70000, 'xanh lá'),
	(7, 2, 3029, 70000, 2, 70000, 'đen'),
	(8, 2, 3027, 50000, 2, 100000, 'đen'),
	(9, 2, 3028, 200000, 2, 400000, 'đen'),
	(10, 2, 3021, 15000, 2, 30000, 'đen'),
	(11, 3, 3027, 50000, 2, 100000, 'đen'),
	(12, 3, 3021, 15000, 2, 30000, 'đen'),
	(13, 3, 3028, 200000, 2, 400000, 'đen'),
	(14, 3, 3029, 70000, 1, 70000, 'xanh lá'),
	(15, 3, 3029, 70000, 2, 70000, 'đen'),
	(16, 4, 3022, 20000, 3, 60000, 'đỏ');



-- Dumping data for table saledb.product_images: ~30 rows (approximately)
INSERT INTO `product_images` (`id`, `product_id`, `image_url`, `public_id`) VALUES
	(27, 3014, 'http://res.cloudinary.com/ddzibjsaq/image/upload/v1708248657/z3aa8agnkpd4bv65ploe.jpg', 'z3aa8agnkpd4bv65ploe'),
	(28, 3014, 'http://res.cloudinary.com/ddzibjsaq/image/upload/v1708248684/xqltyplbuebk8mny6ihb.jpg', 'xqltyplbuebk8mny6ihb'),
	(29, 3014, 'http://res.cloudinary.com/ddzibjsaq/image/upload/v1708248702/p4vlifjvka0eq4zjixzf.jpg', 'p4vlifjvka0eq4zjixzf'),
	(30, 3015, 'http://res.cloudinary.com/ddzibjsaq/image/upload/v1708248785/llfayz55ryc23q4x3mz6.jpg', 'llfayz55ryc23q4x3mz6'),
	(31, 3015, 'http://res.cloudinary.com/ddzibjsaq/image/upload/v1708248795/pyokfsvnj7i9s3w6ktkx.jpg', 'pyokfsvnj7i9s3w6ktkx'),
	(32, 3015, 'http://res.cloudinary.com/ddzibjsaq/image/upload/v1708248859/a9kidxbggvkcxwq7upws.jpg', 'a9kidxbggvkcxwq7upws'),
	(33, 3016, 'http://res.cloudinary.com/ddzibjsaq/image/upload/v1708248880/hoqefmbvtlfhyjcfaiwp.jpg', 'hoqefmbvtlfhyjcfaiwp'),
	(34, 3016, 'http://res.cloudinary.com/ddzibjsaq/image/upload/v1708248888/x8xvvbn8bk5ckn3jdq7v.jpg', 'x8xvvbn8bk5ckn3jdq7v'),
	(35, 3017, 'http://res.cloudinary.com/ddzibjsaq/image/upload/v1708248956/a3enanmvcxhufkyt6a9v.jpg', 'a3enanmvcxhufkyt6a9v'),
	(36, 3018, 'http://res.cloudinary.com/ddzibjsaq/image/upload/v1708249030/urtysfphvmmmddxmdcxr.jpg', 'urtysfphvmmmddxmdcxr'),
	(37, 3019, 'http://res.cloudinary.com/ddzibjsaq/image/upload/v1708249084/gplcd9iw9cfx7if31f7a.jpg', 'gplcd9iw9cfx7if31f7a'),
	(38, 3020, 'http://res.cloudinary.com/ddzibjsaq/image/upload/v1708249135/qr0hyvgen0zjt48gkyt9.jpg', 'qr0hyvgen0zjt48gkyt9'),
	(39, 3020, 'http://res.cloudinary.com/ddzibjsaq/image/upload/v1708249159/lthkt9su1wdgybmglfsa.jpg', 'lthkt9su1wdgybmglfsa'),
	(40, 3020, 'http://res.cloudinary.com/ddzibjsaq/image/upload/v1708249175/nxooxs2xwjwvyfhvi15e.jpg', 'nxooxs2xwjwvyfhvi15e'),
	(41, 3020, 'http://res.cloudinary.com/ddzibjsaq/image/upload/v1708249207/fd0uzikfmcx1sbcmakax.jpg', 'fd0uzikfmcx1sbcmakax'),
	(42, 3020, 'http://res.cloudinary.com/ddzibjsaq/image/upload/v1708249233/p9uuvbohcgwqujcywge3.jpg', 'p9uuvbohcgwqujcywge3'),
	(43, 3021, 'http://res.cloudinary.com/ddzibjsaq/image/upload/v1708249321/kz8w1nqshzne5qb0axgg.jpg', 'kz8w1nqshzne5qb0axgg'),
	(44, 3022, 'http://res.cloudinary.com/ddzibjsaq/image/upload/v1708249391/xeawxcrywqi3znsjvqox.jpg', 'xeawxcrywqi3znsjvqox'),
	(45, 3023, 'http://res.cloudinary.com/ddzibjsaq/image/upload/v1708249438/pvrxuyjfcp42l98ahxk3.jpg', 'pvrxuyjfcp42l98ahxk3'),
	(46, 3024, 'http://res.cloudinary.com/ddzibjsaq/image/upload/v1708249604/qud7zkgfojue1jgzzjcp.jpg', 'qud7zkgfojue1jgzzjcp'),
	(47, 3024, 'http://res.cloudinary.com/ddzibjsaq/image/upload/v1708249620/ojaq3s6ag0wz1upm5ekr.jpg', 'ojaq3s6ag0wz1upm5ekr'),
	(48, 3025, 'http://res.cloudinary.com/ddzibjsaq/image/upload/v1708249719/rmcavviyigewxg0qhfbs.jpg', 'rmcavviyigewxg0qhfbs'),
	(49, 3025, 'http://res.cloudinary.com/ddzibjsaq/image/upload/v1708249731/c0st96jojfc0falxi4io.jpg', 'c0st96jojfc0falxi4io'),
	(50, 3026, 'http://res.cloudinary.com/ddzibjsaq/image/upload/v1708249958/viu0lcprbotlvouhomt2.jpg', 'viu0lcprbotlvouhomt2'),
	(51, 3027, 'http://res.cloudinary.com/ddzibjsaq/image/upload/v1708250023/jw4fody1gmhsagc4j783.jpg', 'jw4fody1gmhsagc4j783'),
	(52, 3028, 'http://res.cloudinary.com/ddzibjsaq/image/upload/v1708250082/t289y0j50mgbcua3izzn.jpg', 't289y0j50mgbcua3izzn'),
	(53, 3029, 'http://res.cloudinary.com/ddzibjsaq/image/upload/v1708250196/pnlszjgqmyzndbow1va1.jpg', 'pnlszjgqmyzndbow1va1'),
	(54, 3029, 'http://res.cloudinary.com/ddzibjsaq/image/upload/v1708319846/eaom3pyy95vuctfurppm.jpg', 'eaom3pyy95vuctfurppm'),
	(55, 3027, 'http://res.cloudinary.com/ddzibjsaq/image/upload/v1708319923/j4l8lixlt3y4qlvxxn6r.jpg', 'j4l8lixlt3y4qlvxxn6r'),
	(56, 3030, 'http://res.cloudinary.com/ddzibjsaq/image/upload/v1708426649/dlzkpedkvputcc7vmrjc.jpg', 'dlzkpedkvputcc7vmrjc');

