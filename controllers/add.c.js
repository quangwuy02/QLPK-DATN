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
    const rs = await DrugsM.getByID(ID);
    if (rs.length == 0) {
      if (req.session.Username) {
        return res.render('.pages/page-not-found', { display1: "d-none", display2: "d-block", role: role });
      }
      else {
        return res.render('.pages/page-not-found', { display1: "d-block", display2: "d-none", role: role });
      }
    }
    // const newData = await DrugsM.getAll();
    res.render('./drug/search-drug', { data: newData, display1: "d-none", display2: "d-block", role: role, info: "add" });
  } catch (err) {
    next(err);
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
