const DrugsM = require("../model/Drugs.m");
const ServicesM = require("../model/Services.m");
// const fs=require('fs');
// const { dirname } = require("path");

exports.postAddDrug = async (req, res, next) => {
  let role = "patient";
  if (req.session.Doctor) {
      role = "doctor";
  }
  if (!req.session.Doctor) {
      if (req.session.Username) {
          return res.render('./pages/error', { display1: "d-none", display2: "d-block", role: role });
      }
      else {
          return res.render('./pages/error', { display1: "d-block", display2: "d-none", role: role });
      }
  }
  try {
    const data = req.body;
    await DrugsM.create({
      Name: data.Name,
      Chemicals: data.Chemicals,
      Unit: data.Unit,
      Uses: data.Uses,
      Price: data.Price,
      Quantity: data.Quantity
    });
    const newDrug = await DrugsM.getByName(data.Name);
    const successMessage = "Thuốc đã được thêm mới thành công!";
    return res.render('./drug/search-drug', { data: newDrug, display1: "d-none", display2: "d-block", role: role, info:"add", successMessage: successMessage });
  } catch (err) {
    const errorMessage = "Đã xảy ra lỗi khi thêm mới thuốc!";
    next(errorMessage);
  }
}

exports.postAddService = async (req, res, next) => {
  let role = "patient";
  if (req.session.Doctor) {
      role = "doctor";
  }
  if (!req.session.Doctor) {
      if (req.session.Username) {
          return res.render('./pages/error', { display1: "d-none", display2: "d-block", role: role });
      } else {
          return res.render('./pages/error', { display1: "d-block", display2: "d-none", role: role });
      }
  }
  try {
      var data = req.body;
      await ServicesM.create(data);
      req.session.info = "add";
      res.redirect('/tim-kiem/dich-vu');
  } catch (err) {
      next(err);
  }
};
