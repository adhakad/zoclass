'use strict';
const StudentModel = require('../models/student');
const StudentUserModel = require('../models/users/student-user');
const AdmissionEnquiryModel = require('../models/admission-enquiry');
const FeesCollectionModel = require('../models/fees-collection');
const AdmitCardModel = require('../models/admit-card');
const ExamResultModel = require('../models/exam-result');
const IssuedTransferCertificateModel = require('../models/issued-transfer-certificate');
const { DateTime } = require('luxon');

let countIssuedTransferCertificate = async (req, res, next) => {
    let countStudent = await StudentModel.count();
    return res.status(200).json({ countStudent });
}

let GetIssuedTransferCertificatePagination = async (req, res, next) => {
    let searchText = req.body.filters.searchText;
    
    let searchObj = {};
    if (searchText) {
        searchObj = /^(?:\d*\.\d{1,2}|\d+)$/.test(searchText)
            ? {
                $or: [{ contact: searchText }],
            }
            : { name: new RegExp(`${searchText.toString().trim()}`, 'i') };
    }
    try {
        let limit = (req.body.limit) ? parseInt(req.body.limit) : 10;
        let page = req.body.page || 1;
        const admissionEnquiryList = await IssuedTransferCertificateModel.find(searchObj).sort({ _id: -1 })
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .exec();
        const countAdmissionEnquiry = await IssuedTransferCertificateModel.count();
        let admissionEnquiryData = { countAdmissionEnquiry: 0 };
        admissionEnquiryData.admissionEnquiryList = admissionEnquiryList;
        admissionEnquiryData.countAdmissionEnquiry = countAdmissionEnquiry;
        return res.json(admissionEnquiryData);
    } catch (error) {
        return res.status(500).json('Internal Server Error !');
    }
}



let GetSingleIssuedTransferCertificate = async (req, res, next) => {
    try {
        const singleStudent = await StudentModel.findOne({ _id: req.params.id });
        return res.status(200).json(singleStudent);
    } catch (error) {
        return res.status(500).json('Internal Server Error !');
    }
}



let CreateIssuedTransferCertificate = async (req, res, next) => {
    let {name, rollNumber, aadharNumber, samagraId, session, stream, admissionNo, dob,doa, gender, category, religion, nationality, contact, address, fatherName, fatherQualification, fatherOccupation, fatherContact, fatherAnnualIncome, motherName, motherQualification, motherOccupation, motherContact, motherAnnualIncome } = req.body;
    let id = req.body._id;
    let className = req.body.class;
    let serialNo = 0;
    let lastIssuedTransferCertificate =  await IssuedTransferCertificateModel.findOne({}).sort({ _id: -1 });
    if(!lastIssuedTransferCertificate){
        serialNo = 1;
    }
    if(lastIssuedTransferCertificate){
        serialNo = lastIssuedTransferCertificate.serialNo + 1;
    }
    if (stream === "stream") {
        stream = "N/A";
    }

    const studentData = {
        serialNo:serialNo,name, rollNumber, aadharNumber, samagraId,class:className, session, stream, admissionNo, dob,doa, gender, category, religion, nationality, contact, address, fatherName, fatherQualification, fatherOccupation, fatherContact, fatherAnnualIncome, motherName, motherQualification, motherOccupation, motherContact, motherAnnualIncome
    }
    try {
        const deleteStudent = await StudentModel.findByIdAndRemove(id);
        if (deleteStudent) {
            const [deleteStudentUser, deleteAdmitCard, deleteExamResult, deleteFeesCollection] = await Promise.all([
                StudentUserModel.deleteOne({ studentId: id }),
                AdmitCardModel.deleteOne({ studentId: id }),
                ExamResultModel.deleteOne({ studentId: id }),
                FeesCollectionModel.deleteOne({ studentId: id }),
            ]);
            if (deleteStudentUser || deleteAdmitCard || deleteExamResult || deleteFeesCollection) {
                let createIssuedTransferCertificate = await IssuedTransferCertificateModel.create(studentData);
                if (createIssuedTransferCertificate) {
                    return res.status(200).json('IssueTransferCertificate');
                }
            }
            let createIssuedTransferCertificate = await IssuedTransferCertificateModel.create(studentData);
            if (createIssuedTransferCertificate) {
                return res.status(200).json('IssueTransferCertificate');
            }
        }
    } catch (error) {
        return res.status(500).json('Internal Server Error !');
    }
}

let DeleteIssuedTransferCertificate = async (req, res, next) => {
    try {
        const id = req.params.id;
        const lastIssuedTC = await IssuedTransferCertificateModel.findOne({}).sort({_id:-1});
        const objectId = lastIssuedTC._id;
        if(id==objectId){
            return res.status(400).json('Last issued transfer certificate detail delete not possible !');
        }
        
        const admissionEnquiry = await IssuedTransferCertificateModel.findByIdAndRemove(id);
        return res.status(200).json('Issued transfer certificate detail delete successfully.');
    } catch (error) {
        return res.status(500).json('Internal Server Error !');
    }
}

module.exports = {
    // countIssuedTransferCertificate,
    GetIssuedTransferCertificatePagination,
    // GetSingleIssuedTransferCertificate,
    CreateIssuedTransferCertificate,
    DeleteIssuedTransferCertificate
}