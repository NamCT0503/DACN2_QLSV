// var http = require("http"); //tham chiếu đến thư viện http
// var func = require("./function");//tham chiếu đến thư viện function (Tạo tại file function.js)
// let prompt = require("prompt-sync") ({sigint:true});

// //Lấy chuỗi nhập vào
// let input_num1 = prompt("- Moi nhap so hang 1: ");
// const num1 = Number(input_num1); //Chuyển đổi kiểu số để tính toán
// let input_num2 = prompt("- Moi nhap so hang 2: ");
// const num2 = Number(input_num2);
// console.log("- Hai so ban vua nhap la: " +input_num1+ " và " +input_num2);

// var server = http.createServer(function(req, res){
//     res.writeHead(200, {"Content-type": "text/html"});
//     res.write("<center><h1>Wellcome to NamCT's Website</h1></center>");
//     res.write("Here is document add new!")
//     res.write("Sum: " + func.cong(num1, num2));

//     res.end();
// });

// server.listen(5500, function(){
//     console.log("Server đang chạy trên cổng 5500")
// });

// tạo server
// tham chiếu đến các thư viện
const exp = require('express');
const mysql = require('mysql'); 
const myConn = require('express-myconnection');
const body_parser = require('body-parser');
const cors = require('cors');


// khởi tạo đối tượng kết nối 
conn = {
    host: 'sql12.freesqldatabase.com',
    user: 'sql12620382',
    password: 'JSgSDCCnEV',
    port: 3306,
    database: 'sql12620382'
};

//tạo kết nối
const web = exp();
web.use(body_parser.json());// giúp gửi giữ liệu từ phía client lên server
web.use(cors());// giúp kết nối an toàn hơn, tránh bị lỗi
web.use(myConn(mysql, conn, 'request'));
web.use(exp.urlencoded({extended: false}));

const port = 3000;
const ip = "192.168.0.103";
// const ip = "192.168.1.113";

web.listen(port, ip, ()=>{
    console.log("Server đang chạy tại http://" +ip+ ":" +port);
})

//sử dụng kết nối để tạo api nhanvien
web.get('/sinhvien/', (req, res)=>{
    req.getConnection((err, connection)=>{
        if(err) res.json(err);
        connection.query('SELECT * FROM SINHVIEN', (errDB, result)=>{
            if(errDB) res.json(errDB);
            res.send(result);
        })
    })
})

//sử dụng kết nối để tạo api phongban
web.get('/hocphan/', (req, res)=>{
    req.getConnection((err, connection)=>{
        if(err) res.json(err);
        connection.query('SELECT * FROM HOCPHAN', (errDB, result)=>{
            if(errDB) res.json(errDB);
            res.send(result);
        })
    })
})

//sử dụng kết nối để tạo api lương
web.get('/hoctap/', (req, res)=>{
    req.getConnection((err, connection)=>{
        if(err) res.json(err);
        connection.query('SELECT * FROM HOCTAP', (errDB, result)=>{
            if(errDB) res.json(errDB);
            res.send(result);
        })
    })
})

//sử dụng kết nối để tạo api công tác
web.get('/kyluat/', (req, res)=>{
    req.getConnection((err, connection)=>{
        if(err) res.json(err);
        connection.query('SELECT * FROM KYLUAT', (errDB, result)=>{
            if(errDB) res.json(errDB);
            res.send(result);
        })
    })
})

//sử dụng kết nối để tạo api tài khoản
web.get('/taikhoan/', (req, res)=>{
    req.getConnection((err, connection)=>{
        if(err) res.json(err);
        connection.query('SELECT * FROM TAIKHOAN', (errDB, result)=>{
            if(errDB) res.json(errDB);
            res.send(result);
        })
    })
})

//sử dụng kết nối để thêm dữ liệu nhân viên
web.post('/nhansu', (req, res)=>{
    // console.log(req.body);
    const addNV = {
        MaNV: req.body.MaNV,
        HoTen: req.body.HoTen,
        DiaChi: req.body.DiaChi,
        GioiTinh: req.body.GioiTinh,
        SDT: req.body.SDT
    }
    req.getConnection((err, connection)=>{
        if(err) res.json(err);
        connection.query('INSERT INTO NhanVien SET ?', addNV, (errDB, result)=>{
            if(errDB) res.json(errDB);
            res.send({
                status: 'Thêm thành công!',
                MaNV: req.body.MaNV,
                HoTen: req.body.HoTen,
                DiaChi: req.body.DiaChi,
                GioiTinh: req.body.GioiTinh,
                SDT: req.body.SDT
            });
        })
    })
})

//sử dụng kết nối để thêm dữ liệu phòng ban
web.post('/phongban/', (req, res)=>{
    // console.log(req.body);
    const addPB = {
        MaPhong: req.body.MaPhong,
        TenPhong: req.body.TenPhong,
        TruongPhong: req.body.TruongPhong
    }
    req.getConnection((err, connection)=>{
        if(err) res.json(err);
        connection.query('INSERT INTO Phong SET ?', addPB, (errDB, result)=>{
            if(errDB) res.json(errDB);
            res.send({
                status: 'Thêm thành công!',
                MaPhong: req.body.MaPhong,
                TenPhong: req.body.TenPhong,
                TruongPhong: req.body.TruongPhong,
            });
        })
    })
})

//sử dụng kết nối để thêm dữ liệu lương
web.post('/luong', (req, res)=>{
    // console.log(req.body);
    const addLuong = {
        MaNV: req.body.MaNV,
        ChucVu: req.body.ChucVu,
        NgayCong: req.body.NgayCong,
        TroCap: req.body.TroCap,
        LuongCung: req.body.LuongCung
    }
    // console.log(addLuong);
    req.getConnection((err, connection)=>{
        if(err) res.json(err);
        connection.query('INSERT INTO Luong SET ?', addLuong, (errDB, result)=>{
            if(errDB) res.json(errDB);
            res.send({
                status: 'Thêm thành công!',
                MaNV: req.body.MaNV,
                ChucVu: req.body.ChucVu,
                NgayCong: req.body.NgayCong,
                TroCap: req.body.TroCap,
                LuongCung: req.body.LuongCung
            });
        })
    })
})

//sử dụng kết nối để thêm dữ liệu công tác
web.post('/congtac/', (req, res)=>{
    console.log(req.body);
    const addCT = {
        MaPhong: req.body.MaPhong,
        MaNV: req.body.MaNV,
        ChucVu: req.body.ChucVu,
        TgCongTac: req.body.TgCongTac
    }
    req.getConnection((err, connection)=>{
        if(err) res.json(err);
        connection.query('INSERT INTO CongTac SET ?', addCT, (errDB, result)=>{
            if(errDB) res.json(errDB);
            res.send({
                status: 'Thêm thành công!',
                MaPhong: req.body.MaPhong,
                MaNV: req.body.MaNV,
                ChucVu: req.body.ChucVu,
                TgCongTac: req.body.TgCongTac
            })
        })
    })
})

//sử dụng kết nối để xóa dữ liệu nhân viên
web.delete('/nhansu/', (req, res)=>{
    // const manv = req.body.MaNV;
    // String(manv);
    const manv = {
        MaNV: String(req.body.MaNV)
    } 
    req.getConnection((err, connection)=>{
        if(err) res.json(err);
        connection.query('DELETE FROM `NhanVien` WHERE ?', manv, (errDB, result)=>{
            if(errDB) res.json(errDB);
            res.send(result);
        })
    })
})

// conn.connect((err)=>{
//     if(err) console.log(err);
//     else{
//         console.log("Kết nối thành công!")

//         var sql = "INSERT INTO `nhanvien`(`MaNV`, `HoTen`, `DiaChi`, `GioiTinh`, `SDT`) VALUES ('IT101', 'Nguyen Manh Cuong', 'Cau Giay - Ha Noi', 'Nam', '0987654321')"
//         conn.query(sql, (err, result)=>{
//             if(err) console.log(err);
//             else{
//                 console.log(result);
//                 console.log("Thêm dữ liệu thành công!");
//             }
//         })
//     }
// });