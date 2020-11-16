import mongoose from 'mongoose';

const BankAccountSchema = new mongoose.Schema({
    agencia: {
        type: Number,
        required: true
    },
    conta: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    balance: {
        type: Number,
        required: true,
        validate: {
            validator: (props: any) => {
                // console.log('Balance: ', props);
                return Promise.resolve(props > 0)
            },
            message: () => `Balance deverá ser maior que zero.`
        }
    },
    createAt: {
        type: Date,
        default: Date.now
    }

});

export default mongoose.model('BankAccount', BankAccountSchema);