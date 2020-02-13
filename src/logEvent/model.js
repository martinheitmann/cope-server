const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const logEventSchema = new Schema({
    local_id: Number,
    eventType: String,
    eventDescription: String,
    eventData: String,
    timestamp: Date,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

const LogEvent = mongoose.model('"LogEvent', logEventSchema);
module.exports = LogEvent;