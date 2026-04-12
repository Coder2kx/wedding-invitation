// ============================================
//  CẤU HÌNH THIỆP CƯỚI - SỬA THÔNG TIN Ở ĐÂY
// ============================================

const CONFIG = {
  // ---- TÊN KHÁCH MỜI (hiển thị trên phong bì) ----
  // Có thể truyền qua URL: ?to=Tên+Khách
  tenKhachMoi: "Quý Khách",

  // ---- CHÚ RỂ ----
  groom: {
    hoTen: "Nguyễn Đức Thắng",
    tenNgan: "Thắng",
    tenHienThi: "Đức Thắng",
    namSinh: 1996,
    vaiTro: "Chú Rể",
    moTa: "Sinh năm 1999. Kỹ sư CNTT. Một người tràn đầy nhiệt huyết, yêu thương và luôn hướng về gia đình.",
    nganHang: "MB Bank",
    soTaiKhoan: "1315 091 999", // hiển thị
    soTaiKhoanCopy: "1315091999", // copy (không dấu cách)
  },

  // ---- CÔ DÂU ----
  bride: {
    hoTen: "Nguyễn Thị Thúy Hồng",
    tenNgan: "Hồng",
    tenHienThi: "Thúy Hồng",
    namSinh: 1998,
    vaiTro: "Cô Dâu",
    moTa: "Sinh năm 1998. Nhân viên kinh doanh. Năng động, nhiệt tình và luôn toả sáng với nụ cười rạng rỡ.",
    nganHang: "MB Bank",
    soTaiKhoan: "0963 240 139",
    soTaiKhoanCopy: "0963240139",
  },

  // ---- GIA ĐÌNH NHÀ TRAI ----
  nhaTrai: {
    cha: "Nguyễn Đức Thiệp",
    me: "Nguyễn Thị Hiền",
    loiGioiThieu: "Trân trọng báo tin lễ thành hôn của con trai",
  },

  // ---- GIA ĐÌNH NHÀ GÁI ----
  nhaGai: {
    cha: "Nguyễn Xuân Lượng",
    me: "Nguyễn Thị Thảo",
    loiGioiThieu: "Trân trọng báo tin vu quy của con gái",
  },

  // ---- NGÀY CƯỚI ----
  ngayCuoi: {
    ngay: 26,
    thang: 4,
    nam: 2026,
    gio: "11:00",
    timezone: "+07:00",
    hienThi: "26 Tháng 04, 2026",
    diaDiem: "Hà Nội",
    hashtag: "#ThangHongWedding",
  },

  // ---- LỄ CƯỚI ----
  // gio / diaDiem / diaChi / banDo = thông tin buổi lễ
  // tiec = tiệc mừng (cùng ngày với thẻ). Bỏ tiec hoặc để null nếu không có tiệc riêng
  suKien: [
    {
      ten: "Lễ Vu Quy",
      icon: "💍",
      ngay: 26,
      thangNam: "Tháng 04, 2026",
      gio: "07:00 Sáng",
      diaDiem: "Gia đình nhà Gái",
      diaChi: "SN 1, Ngõ 69, Xã Ô Diên, Hà Nội",
      banDo: "https://maps.google.com/?q=21.084594,105.707264",
      tiec: {
        ngay: 25,
        thangNam: "Tháng 04, 2026",
        gio: "17:00 Chiều",
        diaDiem: "Nhà văn hoá Cụm 9",
        banDo: "https://maps.app.goo.gl/VJHiJLEnGnYYaTRW7",
      },
    },
    {
      ten: "Lễ Thành Hôn",
      icon: "💕",
      ngay: 26,
      thangNam: "Tháng 04, 2026",
      gio: "11:45 Sáng",
      diaDiem: "Gia đình nhà Trai",
      diaChi: "SN 33, KDC Kim Xuyên 4, Phường Phạm Sư Mạnh, Hải Phòng",
      banDo: "https://maps.google.com/?q=21.009123,106.501478",
      tiec: {
        ngay: 26,
        thangNam: "Tháng 04, 2026",
        gio: "11:45 Sáng",
        diaDiem: "Gia đình nhà Trai",
        banDo: "https://maps.google.com/?q=21.009123,106.501478",
      },
    },
  ],

  // ---- CÂU CHUYỆN TÌNH YÊU ----
  cauChuyen: [
    {
      ngay: "Cuối Thu 2019",
      tieuDe: "Lần Đầu Gặp Gỡ",
      moTa: "Thời còn là sinh viên, giữa những ca làm thêm vội vã, anh bắt gặp em như bắt gặp một vì sao lạ — bỗng dưng tim rung lên một nhịp chưa từng có, và thế giới nhỏ lại chỉ còn một ánh nhìn.",
      anh: "assets/images/story/story-01.jpg",
    },
    {
      ngay: "Mùa Đông 2019",
      tieuDe: "Hẹn Hò Đầu Tiên",
      moTa: "Chiều Hồ Tây êm ả, hai đứa ngồi bên tách cà phê còn nóng, kể cho nhau nghe cả những điều chưa từng kể. Gió lướt qua tóc em, và anh biết — từ khoảnh khắc ấy, anh muốn giữ em lại thật lâu.",
      anh: "assets/images/story/story-02.jpg",
    },
    {
      ngay: "Thời COVID",
      tieuDe: "Chính Thức Yêu Nhau",
      moTa: "Mùa dịch kéo hai đứa xa cách địa lý, nhưng không xa cách trái tim: đêm nào cũng thức cùng nhau qua màn hình, cười khóc sẻ chia đến tận sáng. Rồi một ngày, hai đứa chính thức nói lời yêu — như thể cả thế giới đang dịu lại để chứng kiến.",
      anh: "assets/images/story/story-03.jpg",
    },
    {
      ngay: "Cuối Thu 2025",
      tieuDe: "Lời Cầu Hôn",
      moTa: "Hoàng hôn Nha Trang nhuộm vàng cả bãi cát, sóng vỗ nhẹ như nhịp tim. Anh nắm tay em, nhìn sâu vào mắt em và nói: “Em ơi, anh muốn cùng em đi hết quãng đường còn lại — sáng tối có nhau, già đi cùng nhau. Em đồng ý làm vợ anh nhé?” Em gật đầu trong nước mắt, và thế là trời đất chứng giám cho lời hứa đời mình.",
      anh: "assets/images/story/story-04.jpg",
    },
  ],

  // ---- LỜI CHÚC MẪU ----
  loiChucMau: [
    {
      ten: "Hoàng Anh",
      noidung: "Chúc hai bạn trăm năm hạnh phúc, sớm có tin vui!",
      thoiGian: "2 giờ trước",
    },
    {
      ten: "Thu Trang",
      noidung: "Happy Wedding! Chúc anh chị hạnh phúc viên mãn!",
      thoiGian: "5 giờ trước",
    },
    {
      ten: "Đức Mạnh",
      noidung: "Chúc mừng hạnh phúc! Trăm năm hạnh phúc, vạn sự như ý!",
      thoiGian: "1 ngày trước",
    },
    {
      ten: "Ngọc",
      noidung: "Tấn hôn hạnh phúc, trăm năm bên nhau!",
      thoiGian: "1 ngày trước",
    },
    {
      ten: "Nam",
      noidung: "Chúc hai bạn trăm năm hòa hợp, hạnh phúc!",
      thoiGian: "2 ngày trước",
    },
    {
      ten: "Trang",
      noidung: "Chúc hai bạn luôn vui vẻ, thuỷ chung và nồng ấy đôi nhau!",
      thoiGian: "2 ngày trước",
    },
    {
      ten: "Phúc",
      noidung: "Mừng tình yêu của hai bạn mãi vĩnh cửu!",
      thoiGian: "3 ngày trước",
    },
    {
      ten: "Hương",
      noidung: "Chúc anh chị sống bên nhau đến đầu bạc răng long!",
      thoiGian: "3 ngày trước",
    },
    {
      ten: "Minh Tuấn",
      noidung: "Trăm năm hạnh phúc, vạn sự như ý, sớm có baby!",
      thoiGian: "4 ngày trước",
    },
    {
      ten: "Linh",
      noidung: "Mãi hạnh phúc bạn nhé! Love you both!",
      thoiGian: "4 ngày trước",
    },
  ],
};
