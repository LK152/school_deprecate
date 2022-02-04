const express = require('express');
const router = express.Router();
const admin = require('../conn');
const auth = admin.auth();
const studentDB = admin.firestore().collection('studentData');
const userDB = admin.firestore().collection('users');

router.route('/').get((req, res) => {
	res.status(200).send('API Deployed Successfully');
});

router.route('/setDoc/:id').post((req, res) => {
	studentDB
		.doc(req.params.id)
		.set(req.body)
		.then(() => res.sendStatus(201))
		.catch(() => res.sendStatus(400));
});

router.route('/updateDoc/:id').patch((req, res) => {
	studentDB
		.doc(req.params.id)
		.update(req.body)
		.then(() => res.sendStatus(200))
		.catch(() => res.sendStatus(400));
});

router.route('/deleteDoc/:id').delete((req, res) => {
	studentDB
		.doc(req.params.id)
		.delete()
		.then(() => res.sendStatus(200))
		.catch(() => res.sendStatus(405));
});

router.route('/addUser/:id').post((req, res) => {
	auth.getUserByEmail(req.params.id)
		.then((user) => {
			const userInfo = {
				email: user.email,
				isAdmin: req.body.isAdmin,
				userClass: req.body.userClass,
				uid: user.uid,
			};

			userDB
				.doc(user.uid)
				.set(userInfo)
				.then(() => res.sendStatus(201))
				.catch(() => res.sendStatus(400));
		})
		.catch(() => res.status(404).json({ error: 'user not found' }));
});

router.route('/updateUser/:id').patch((req, res) => {
	auth.getUserByEmail(req.params.id)
		.then((user) => {
			userDB
				.doc(user.uid)
				.update(req.body)
				.then(() => res.sendStatus(200))
				.catch(() => res.sendStatus(400));
		})
		.catch(() => res.status(404).json({ error: 'user not found' }));
});

router.route('/deleteUser/:id').delete((req, res) => {
	auth.getUserByEmail(req.params.id)
		.then((user) => {
			userDB
				.doc(user.uid)
				.delete()
				.then(() => res.sendStatus(200))
				.catch(() => res.sendStatus(400));
		})
		.catch(() => res.status(404).json({ error: 'user not found' }));
});

router.route('/updateGroup').post((req, res) => {
	if (Array.isArray(req.body.selected) && req.body.selected.length <= 100) {
		req.body.selected.forEach((id) => {
			auth.getUserByEmail(id)
				.then((user) => {
					studentDB
						.doc(user.uid)
						.update({ group: req.body.group })
						.then(() => res.sendStatus(201))
						.catch(() => res.sendStatus(400));
				})
				.catch(() => res.status(404).json({ error: 'user not found' }));
		});
	} else {
		res.sendStatus(406);
	}
});

router.route('/deleteGroup').post((req, res) => {
	if (Array.isArray(req.body) && req.body.length <= 100) {
		req.body.forEach((id) => {
			auth.getUserByEmail(id)
				.then((user) => {
					studentDB
						.doc(user.uid)
						.update({ group: '' })
						.then(() => res.sendStatus(200))
						.catch(() => res.sendStatus(400));
				})
				.catch(() => res.status(404).json({ error: 'user not found' }));
		});
	} else {
		res.sendStatus(406);
	}
});

router.route('/getAllUsers').post((req, res) => {
	if (req.body.isAdmin) {
		const listAllUsers = (NPT) => {
			auth.listUsers(1000, NPT)
				.then((results) => {
					res.json(results.users);
					if (results.pageToken) {
						listAllUsers(results.pageToken);
					}
				})
				.catch(() => res.sendStatus(400));
		};

		listAllUsers();
	} else {
		res.sendStatus(401);
	}
});

module.exports = router;
