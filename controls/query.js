const Letter = require('../models/Letter')
const { DestributionType } = require('../config/config')
const { SMS, eMail, PRINT } = DestributionType;
const Op = require('Sequelize').Op;

async function query(insureId) {

    const sms = [];
    const print = [];
    const email = [];

    const res = await Letter.findAll({
        where: {
            insureId, status: {
                [Op.or]: ['Failed\r', 'Failed']
            }
        }
    })
    const data = JSON.parse(JSON.stringify(res, null, 2))

    data.forEach(key => {
        switch (key.destributionType) {
            case SMS:
                sms.push(key.letterID)
                break;
            case eMail:
                email.push(key.letterID)
                break;
            case PRINT:
                print.push(key.letterID)
                break;
            default:
                break;
        }
    });
    return { sms, print, email }
}
module.exports = query;