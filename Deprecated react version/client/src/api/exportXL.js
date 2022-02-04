import XLSX from 'xlsx';
import FS from 'file-saver';

const exportXL = (records, fileName) => {
	const fileType =
		'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
	const fileExtent = '.xlsx';
	const AoO = []
		.concat(records)
		.sort((a, b) => a.class - b.class || a.number - b.number);

	const docs = AoO.map((doc) => {
		return {
			班級: doc.class,
			座號: doc.number,
			姓名: doc.name,
			Email: doc.email,
			主題: doc.topicLabel,
			副主題: doc.subTopicLabel,
			備註: doc.comment,
			組員人數: doc.memNum,
			組員1: doc.mem1Class.toString() + doc.mem1Num.toString(),
			組員2: doc.mem2Class.toString() + doc.mem2Num.toString(),
			組別: doc.group,
		};
	});

	const wsNames = [
		'全部',
		'201',
		'202',
		'203',
		'204',
		'205',
		'206',
		'207',
		'208',
		'209',
		'210',
		'211',
	];

	const wsData = wsNames.reduce((item, key) => {
		if (key === '全部') {
			item[key] = XLSX.utils.json_to_sheet(docs);
		} else {
			item[key] = XLSX.utils.json_to_sheet(
				docs.filter((docClass) => {
					return docClass.班級.toString() === key;
				})
			);
		}
		return item;
	}, {});

	const wb = { Sheets: wsData, SheetNames: wsNames };
	const excelBuffer = XLSX.write(wb, {
		bookType: 'xlsx',
		type: 'array',
	});
	const data = new Blob([excelBuffer], { type: fileType });

	return FS.saveAs(data, fileName + fileExtent);
};

export default exportXL;
