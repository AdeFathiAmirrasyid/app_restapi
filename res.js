"use strict";

exports.ok = function (values, res) {
  var data = {
    status: 200,
    value: values,
  };

  res.json(data);
  res.end();
};

//responese untuk nested matakuliah
exports.oknested = function (values, res) {
  //lakukan akumulasi
  const hasil = values.reduce((akumulasi, item) => {
    // tentukan key group
    if (akumulasi[item.nama]) {
      //buat variable group nama mahasiswa
      const group = akumulasi[item.nama];
      //cek jika isi array adalah matakuliah
      if (Array.isArray(group.matakuliah)) {
        //tambahkan value ke dalam group matakuliah
        group.matakuliah.push(item.matakuliah);
      } else {
        group.matakuliah = [group.matakuliah, item.matakuliah];
      }
    } else {
      akumulasi[item.nama] = item;
    }
    return akumulasi;
  }, {});

  const data = {
    status: 200,
    values: hasil
  };
  res.json(data);
  res.end();
};
