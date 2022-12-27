let totalHarga = 0
let jumlahMakanan = 0
let jumlahMinuman = 0

function tambahMenu(harga, tipe, elementID) {
    totalHarga += harga
    if(tipe == "makanan") {
        jumlahMakanan++
    }
    else {
        jumlahMinuman++
    }
    let jumlahItem = Number(document.getElementById(elementID).innerHTML)
    document.getElementById(elementID).innerHTML = `${jumlahItem + 1}`
    if(jumlahMakanan == 0 && jumlahMinuman == 0) {
        document.getElementById("foodSummary").innerHTML = `Anda belum memilih menu apapun`
    }
    else if(jumlahMakanan == 0 && jumlahMinuman != 0) {
        document.getElementById("foodSummary").innerHTML = `Total : ${jumlahMinuman} Minuman`
    }
    else if(jumlahMinuman == 0 && jumlahMakanan != 0) {
        document.getElementById("foodSummary").innerHTML = `Total : ${jumlahMakanan} Makanan`
    }
    else{
        document.getElementById("foodSummary").innerHTML = `Total : ${jumlahMakanan} Makanan dan ${jumlahMinuman} Minuman`
    }
    document.getElementById("priceSummary").innerHTML = `Harga : Rp ${totalHarga}.000`
}

function kurangMenu(harga, tipe, elementID) {
    let jumlahItem = Number(document.getElementById(elementID).innerHTML)
    if(jumlahItem != 0) {
        totalHarga -= harga
        if(tipe == "makanan") {
            jumlahMakanan--
        }
        else {
            jumlahMinuman--
        }
        document.getElementById(elementID).innerHTML = `${jumlahItem - 1}`
        if(jumlahMakanan == 0 && jumlahMinuman == 0) {
            document.getElementById("foodSummary").innerHTML = `Anda belum memilih menu apapun`
        }
        else if(jumlahMakanan == 0 && jumlahMinuman != 0) {
            document.getElementById("foodSummary").innerHTML = `Total : ${jumlahMinuman} Minuman`
        }
        else if(jumlahMinuman == 0 && jumlahMakanan != 0) {
            document.getElementById("foodSummary").innerHTML = `Total : ${jumlahMakanan} Makanan`
        }
        else{
            document.getElementById("foodSummary").innerHTML = `Total : ${jumlahMakanan} Makanan dan ${jumlahMinuman} Minuman`
        }
        document.getElementById("priceSummary").innerHTML = `Harga : Rp ${totalHarga}.000`
    }
}

function pesanMakanan() {
    if (!liff.isInClient()) {
        alert("Harap buka aplikasi melalui aplikasi line untuk dapat memesan :)");
    } else {
        let textMessage = `Saya ingin memesan makanan dengan rincian sebagai berikut :\n* ${jumlahMakanan} makanan\n* ${jumlahMinuman} minuman,\ndengan total harga sebesar : Rp ${totalHarga}.000,-\nMohon diproses ya kak :)`

        liff.sendMessages([{
            'type': 'text',
            'text': textMessage
        }]).then(function() {
            window.alert('Pesanan anda telah terkirim, harap menunggu balasan dari admin');
        }).catch(function(error) {
            window.alert('Pesanan anda gagal terkirim: ' + error);
        });
    }
}

function openExternal() {
    liff.openWindow({
        url: 'https://liff-sgpc.netlify.app',
        external: true
    });
}
