// // tham chiếu đến thư viện mysql
// const exp = require('express');
// const mysql = require('mysql'), myConn = require('express-myconnection');

// // tạo kết nối 
// conn = {
//     host: '127.0.0.1',
//     user: 'root',
//     password: '',
//     port: 3306,
//     database: 'qlnhansu'
// };

// const web = exp();
// web.use(myConn(mysql, conn, 'single'));
// const port = 3000;
// web.listen(port, ()=>{
//     console.log("Server đang chạy tại cổng: " +port);
// })
// conn.connect((err)=>{
//     if(err) console.log(err);
//     else{
//         console.log("Kết nối thành công!")

//         // var sql = "INSERT INTO `nhanvien`(`MaNV`, `HoTen`, `DiaChi`, `GioiTinh`, `SDT`) VALUES ('IT101', 'Nguyen Manh Cuong', 'Cau Giay - Ha Noi', 'Nam', '0987654321')"
//         // conn.query(sql, (err, result)=>{
//         //     if(err) console.log(err);
//         //     else{
//         //         console.log(result);
//         //         console.log("Thêm dữ liệu thành công!");
//         //     }
//         // })
//     }
// });