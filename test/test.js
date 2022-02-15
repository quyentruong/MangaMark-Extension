import { expect } from 'chai';
import cheerio from 'cheerio';
import request from 'request';

describe('vcomi.co', () => {
    it('Toàn Chức Pháp Sư 830', (done) => {
        request({
            method: 'GET',
            url: 'https://vcomi.co/doc-toan-chuc-phap-su-chuong-830.html'
        }, (err, res, body) => {

            if (err) done(err);

            let $ = cheerio.load(body);

            let chap_number = $(".active").html().split(" ")[1];
            expect(chap_number).to.equal('830');

            let manga = $(".breadcrumb").find("a").last().html();
            expect(manga).to.equal('Toàn Chức Pháp Sư');
            done();
        });
    })
    it('Võ Luyện Đỉnh Phong 1951', (done) => {
        request({
            method: 'GET',
            url: 'https://vcomi.co/doc-vo-luyen-dinh-phong-chuong-1951.html'
        }, (err, res, body) => {

            if (err) return done(err);

            let $ = cheerio.load(body);

            let chap_number = $(".active").html().split(" ")[1];
            expect(chap_number).to.equal('1951');

            let manga = $(".breadcrumb").find("a").last().html();
            expect(manga).to.equal('Võ Luyện Đỉnh Phong');
            done();
        });
    })
})

describe('vcomic.net', () => {
    it('Võ Luyện Đỉnh Phong 1947', (done) => {
        request({
            method: 'GET',
            url: 'https://vcomic.net/doc-vo-luyen-dinh-phong-chuong-1947.html'
        }, (err, res, body) => {

            if (err) return done(err);

            let $ = cheerio.load(body);

            let manga = $("span[itemprop = 'name']")['2'].childNodes[0].data;
            let chap_number = $("span[itemprop = 'name']")['3'].childNodes[0].data.split(" ")[1];
            expect(manga).to.equal('Võ Luyện Đỉnh Phong');
            expect(chap_number).to.equal('1947');
            done();
        });
    })
    it('Ta Có Một Sơn Trại 242', (done) => {
        request({
            method: 'GET',
            url: 'https://vcomic.net/doc-ta-co-mot-son-trai-chuong-242.html'
        }, (err, res, body) => {

            if (err) return done(err);

            let $ = cheerio.load(body);

            let manga = $("span[itemprop = 'name']")['2'].childNodes[0].data;
            let chap_number = $("span[itemprop = 'name']")['3'].childNodes[0].data.split(" ")[1];
            expect(manga).to.equal('Ta Có Một Sơn Trại');
            expect(chap_number).to.equal('242');
            done();
        });
    })
})

describe('truyentranhaudio.online', () => {
    it('Ta Có Một Sơn Trại 236', (done) => {
        request({
            method: 'GET',
            url: 'https://truyentranhaudio.online/doc-ta-co-mot-son-trai-chuong-236.html'
        }, (err, res, body) => {

            if (err) return done(err);

            let $ = cheerio.load(body);

            let manga = $("span[itemprop = 'name']")['2'].childNodes[0].data;
            let chap_number = $("span[itemprop = 'name']")['3'].childNodes[0].data.split(" ")[1];
            expect(manga).to.equal('Ta Có Một Sơn Trại');
            expect(chap_number).to.equal('236');
            done();
        });
    })
    it('Toàn Chức Pháp Sư 818', (done) => {
        request({
            method: 'GET',
            url: 'https://truyentranhaudio.online/doc-toan-chuc-phap-su-chuong-818.html'
        }, (err, res, body) => {

            if (err) return done(err);

            let $ = cheerio.load(body);

            let manga = $("span[itemprop = 'name']")['2'].childNodes[0].data;
            let chap_number = $("span[itemprop = 'name']")['3'].childNodes[0].data.split(" ")[1];
            expect(manga).to.equal('Toàn Chức Pháp Sư');
            expect(chap_number).to.equal('818');
            done();
        });
    })
})

describe('truyentranhaudio.com', () => {
    it('Ta Có Một Sơn Trại 200', (done) => {
        request({
            method: 'GET',
            url: 'https://truyentranhaudio.com/doc-ta-co-mot-son-trai-chuong-200.html'
        }, (err, res, body) => {
            if (err) done(err);
            let $ = cheerio.load(body);
            let manga = $("span[itemprop = 'name']")['2'].childNodes[0].data;
            let chap_number = $("span[itemprop = 'name']")['3'].childNodes[0].data.split(" ")[1];
            expect(manga).to.equal('Ta Có Một Sơn Trại');
            expect(chap_number).to.equal('200');
            done();
        })
    })
    it('Toàn Chức Pháp Sư 800', (done) => {
        request({
            method: 'GET',
            url: 'https://truyentranhaudio.com/doc-toan-chuc-phap-su-chuong-800.html'
        }, (err, res, body) => {
            if (err) return done(err);
            let $ = cheerio.load(body);
            let manga = $("span[itemprop = 'name']")['2'].childNodes[0].data;
            let chap_number = $("span[itemprop = 'name']")['3'].childNodes[0].data.split(" ")[1];
            expect(manga).to.equal('Toàn Chức Pháp Sư');
            expect(chap_number).to.equal('800');
            done();
        })
    })
})