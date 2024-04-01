const CrudTbl = require('../models/usercrud');
const fs = require('fs');
const index = async (req, res) => {
    try {
        let user = await CrudTbl.find({});
        if (user) {
            return res.render('index', {
                user,
                single: "",
            });
        } else {
            console.log("Record not fetch");
            return res.redirect('back');
        }
    }
    catch (err) {
        console.log(err);
        return res.redirect('back');
    }
}
const insertdata = async (req, res) => {
    try {
        const { name, email, phone, status } = req.body;
        let editId = req.body.editid;
        if (editId) {
            if (req.file) {
                if (!name || !email || !phone || !status ) {
                    console.log("plese all field fill");
                    return res.redirect('back');
                }
                //old image unlink
                let deleteRecord = await CrudTbl.findById(editId);
                if (deleteRecord) {
                    fs.unlinkSync(deleteRecord.image);
                } else {
                    console.log("file not unlink");
                    return res.redirect('back');
                }
                //old image unlink

                //new image upload in folder
                let image = "";
                if (req.file) {
                    image = req.file.path;
                    console.log(image);
                }
                //new image upload in folder

                let updateRecord = await CrudTbl.findByIdAndUpdate(editId, {
                    name: name,
                    email: email,
                    phone: phone,
                    status: status,
                    image: image
                })
                if (updateRecord) {
                    console.log("record successfully update");
                    return res.redirect('/');
                } else {
                    console.log("record not successfully  update");
                    return res.redirect('/');
                }
            } else {
                let image = "";
                let singleRecord = await CrudTbl.findById(editId);
                if (singleRecord) {
                    image = singleRecord.image;
                    let updatedata = await CrudTbl.findByIdAndUpdate(editId, {
                        name: name,
                        email: email,
                        phone: phone,
                        status: status,
                        image: image
                    })
                    if (updatedata) {
                        console.log("Record successfully update");
                        return res.redirect('/');
                    } else {
                        console.log("Record not successfully update");
                        return res.redirect('/');
                    }
                } else {
                    console.log("Record not fetch");
                    return res.redirect('/');
                }
            }
        } else {
            if (!name || !email || !phone || !status) {
                console.log("plese all field fill");
                return res.redirect('back');
            }
            let image = "";
            if (req.file) {
                image = req.file.path;
                console.log(req.file.path);
            }
            let data = await CrudTbl.create({
                name: name,
                email: email,
                phone: phone,
                status: status,
                image: image
            })
            if (data) {
                console.log("Record successfully insert");
                return res.redirect('back');
            } else {
                console.log(err);
                return res.redirect('back');
            }
        }
    } catch (err) {
        console.log(err);
        return res.redirect('/');
    }
}
const deleteData = async (req, res) => {
    try {
        let id = req.query.id;
        // file unlink start
        let deleteRecord = await CrudTbl.findById(id);
        if (deleteRecord) {
            fs.unlinkSync(deleteRecord.image);
        } else {
            console.log("Record not delete");
            return res.redirect("/");
        }
        let data = await CrudTbl.findByIdAndDelete(id);
        if (data) {
            console.log("Record successfully delete");
            return res.redirect("back");
        } else {
            console.log("Record not delete");
            return res.redirect("back");
        }
    } catch (err) {
        console.log(err);
        return res.redirect("/");
    }
};

const updateData = async (req, res) => {
    try {
        let id = req.query.id;
        console.log(id);
        let alldata = await CrudTbl.find({});
        let single = await CrudTbl.findById(id);
        if (single) {
            return res.render('index', {
                single,
                user: alldata
            })
        } else {
            console.log("record not fetch");
            return res.redirect('/');
        }
    } catch (err) {
        console.log(err);
        return res.redirect('/');
    }
}
const searchData = async (req, res) => {
    try {
        const searchTerm = req.query.searchTerm;
        const searchResults = await CrudTbl.find({
            $or: [
                { name: { $regex: searchTerm, $options: 'i' } },
                { email: { $regex: searchTerm, $options: 'i' } },
                { phone: { $regex: searchTerm, $options: 'i' } }
            ]
        });
        return res.render('index', {
            user: searchResults,
            single: "",
        });
    } catch (err) {
        console.log(err);
        return res.redirect('/');
    }
};

const allshow = async(req,res)=>{
    try {
        return res.redirect('/');
    } catch (error) {
        console.log(err);
        return false
    }
}

module.exports = {
    index,
    insertdata,
    deleteData,
    updateData,
    searchData,
    allshow
}