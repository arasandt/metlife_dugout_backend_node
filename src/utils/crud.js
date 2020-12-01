const getOne = (model) => async (req, res) => {
    searchItem = req.query.id
    try {
        const doc = await model
            .find({id: searchItem}, { _id: 0 })
            .lean()
            .exec()
        if (!doc) {
            return res.status(400).end()
        }
        res.status(200).json({ data : doc })
    } catch (e) {
        console.error(e)
        res.status(400).end()
    }
}

const createOne = (model) => async (req, res) => {
    try {
        const doc = await model.create({ ...req.body })
        res.status(201).json({ data: doc })
    } catch (e) {
        console.error(e)
        res.status(400).end()
    }
}

const updateOne = (model) => async (req, res) => {
    try {

        if (req.body.id) {
            delete req.body.id
        }
        const updatedDoc = await model
            .findOneAndUpdate(
                {
                    id: req.query.id
                },
                req.body,
                { 
                new: true,
                projection: { _id: 0}
                },
                
            )
            .lean()
            .exec()

        if (!updatedDoc) {
            return res.status(400).end()
        }

        res.status(200).json({ data: updatedDoc })
    } catch (e) {
        console.error(e)
        res.status(400).end()
    }
}

const removeOne = (model) => async (req, res) => {
    try {
        const removed = await model.findOneAndDelete({
            id: req.query.id
        })
        if (!removed) {
            return res.status(400).end()
        }
        return res.status(200).json({ data: removed })
    } catch (e) {
        console.error(e)
        res.status(400).end()
    }
}

const crudControllers = model => ({
    getOne: getOne(model),
    createOne: createOne(model),
    removeOne: removeOne(model),
    updateOne: updateOne(model),
})
// console.log(typeof crudControllers)
module.exports = crudControllers