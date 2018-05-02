const request = require('request');

describe('api test', () => {
    it('return valid response', async () => {
        // APIコール
        const options = {
            url: 'http://localhost:3010/register',
            method: 'POST',
        }
        const responseStr = await apiClient(options);
        // レスポンスの確認
        const res = JSON.parse(responseStr);
        expect(res.id).toEqual(1);
        expect(res.title).toEqual("test");
    });
});

const apiClient = async options => {
    return new Promise((resolve, reject) => {
        request(options, (err, resm, body) => {
            if (err) reject(err);
            resolve(body);
        })
    })
};
