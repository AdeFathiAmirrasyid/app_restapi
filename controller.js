"use strict";

var response = require("./res");
var connection = require("./koneksi");

exports.index = function (req, res) {
  response.ok("Aplikasi REST API berhasil berjalan", res);
};

//menampilkan  semua data mahasiswa
exports.show_mahasiswa = function (req, res) {
  connection.query("SELECT * FROM mahasiswa", function (error, rows, fileds) {
    if (error) {
      console.log(error);
    } else {
      response.ok(rows, res);
    }
  });
};

//menampilkan semua data mahasiswa berdasarkan id
exports.show_mahasiswaId = function (req, res) {
  let id = req.params.id;
  connection.query(
    "SELECT * FROM mahasiswa WHERE id_mahasiswa = ? ",
    [id],
    function (error, rows, fileds) {
      if (error) {
        console.log(error);
      } else {
        response.ok(rows, res);
      }
    }
  );
};

//Menambahkan data mahasiswa
exports.addMahasiswa = function (req, res) {
  const nim = req.body.nim;
  const nama = req.body.nama;
  const jurusan = req.body.jurusan;

  connection.query(
    "INSERT INTO mahasiswa (nim,nama,jurusan) VALUES (?,?,?)",
    [nim, nama, jurusan],
    function (error, rows, fileds) {
      if (error) {
        console.log(error);
      } else {
        response.ok("Berhasil Menambahkan Data", res);
      }
    }
  );
};

//Mengubah data berdasarkan id
exports.changeMahasiswa = function (req, res) {
  const id = req.body.id_mahasiswa;
  const nim = req.body.nim;
  const nama = req.body.nama;
  const jurusan = req.body.jurusan;

  connection.query(
    "UPDATE mahasiswa SET nim=?, nama=?, jurusan=? WHERE id_mahasiswa=?",
    [nim, nama, jurusan, id],
    function (error, rows, fileds) {
      if (error) {
        console.log(error);
      } else {
        response.ok("Berhasil Ubah Data", res);
      }
    }
  );
};

//Menghapus data berdasarkan id
exports.deleteMahasiswa = function (req, res) {
  const id = req.body.id_mahasiswa;
  connection.query(
    "DELETE FROM mahasiswa WHERE id_mahasiswa=?",
    [id],
    function (error, rows, fileds) {
      if (error) {
        console.log(error);
      } else {
        response.ok("Berhasil Hapus Data Mahasiswa", res);
      }
    }
  );
};

//Menampilkan matakuliah group
exports.showGroupMatakuliah = function (req, res) {
  connection.query(
    `SELECT mahasiswa.id_mahasiswa, mahasiswa.nim, mahasiswa.nama, mahasiswa.jurusan, matakuliah.matakuliah,matakuliah.sks 
      FROM krs JOIN matakuliah JOIN mahasiswa 
      WHERE krs.id_matakuliah = matakuliah.id_matakuliah AND krs.id_mahasiswa = mahasiswa.id_mahasiswa 
      ORDER BY mahasiswa.id_mahasiswa`,
    function (error, rows, fileds) {
      if (error) {
        console.log(error);
      } else {
        response.oknested(rows, res);
      }
    }
  );
};
