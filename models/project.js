const mongoose = require('mongoose')

const projectSchema = {
    title: {
        type: String,
        required: true
    },
    startDate: {
        type: Date
    },
    endDate: {
        type: Date
    },
    type: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: "New Project"
    },
    shots: {
        type: Array,
        default: []
    }
}

module.exports = mongoose.model('Project', projectSchema)