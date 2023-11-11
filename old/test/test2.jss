import { expect } from 'chai';
import cheerio from 'cheerio';
import request from 'request';

describe('nettruyengo.com', () => {
    it('Ta Có Một Sơn Trại 242', () => {
        request({
            method: 'GET',
            url: 'https://www.nettruyengo.com/truyen-tranh/ta-co-mot-son-trai/chap-242/822747'
        }, (err, res, body) => {
            // if (err) return done(err);
            let $ = cheerio.load(body);
            console.log($('title').text());
            let manga = $("span[itemprop = 'name']").html();
            console.log(manga);
            // let chap_number = $("span[itemprop = 'name']")['3'].childNodes[0].data.split(" ")[1];
            // expect(manga).to.equal('Ta Có Một Sơn Trại');
            // expect(chap_number).to.equal('242');
            // done();
        });
    });
    // it('Toàn Chức Pháp Sư 829', (done) => {
    //     request({
    //         method: 'GET',
    //         url: 'https://www.nettruyengo.com/truyen-tranh/toan-chuc-phap-su/chap-829/822746'
    //     }, (err, res, body) => {
    //         if (err) return done(err);
    //         let $ = cheerio.load(body);
    //         let manga = $("span[itemprop = 'name']")['2'].childNodes[0].data;
    //         let chap_number = $("span[itemprop = 'name']")['3'].childNodes[0].data.split(" ")[1];
    //         expect(manga).to.equal('Toàn Chức Pháp Sư');
    //         expect(chap_number).to.equal('829');
    //         done();
    //     });
    // });
})