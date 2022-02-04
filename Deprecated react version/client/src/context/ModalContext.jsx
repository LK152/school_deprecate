import { auth, db } from '../service/firestore';
import { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import useSessionState from '../hooks/useSessionState';
import { doc, onSnapshot, query, collection, where } from 'firebase/firestore';

const ModalContext = createContext();

export const initialValues = {
	studentClass: '',
	number: '',
	name: '',
	mainTopic: '',
	subTopic: '',
	otherTopic: '',
	comment: '',
	memNum: '1',
	mem1Class: '',
	mem1Num: '',
	mem2Class: '',
	mem2Num: '',
};

const ModalProvider = ({ children }) => {
	const [authState, setAuth] = useState({
		isAdmin: false,
		isUser: false,
		teacherClass: '',
	});
	const [selectedValues, setSelectedValues] = useState({
		selection: 0,
		selectedGroup: 201,
		group: '',
	});
	const [selected, setSelected] = useState([]);
	const [values, setValues] = useState(initialValues);
	const [users, setUsers] = useSessionState('users', []);
	const [document, setDoc] = useSessionState('doc', {});
	const [info, setInfo] = useSessionState('userInfo', null);
	const [studentRecord, setRecord] = useSessionState('record', []);
	const { isAdmin, isUser, teacherClass } = authState;
	const { selection } = selectedValues;
	const { uid } = info ?? {};

	useEffect(
		() =>
			onAuthStateChanged(auth, (user) => {
				setInfo(user ? user : null);
				if (!user) {
					setAuth({
						isAdmin: false,
						isUser: false,
						class: '',
					});
					sessionStorage.clear();
				}
			}),
		[setInfo, setAuth]
	);

	useEffect(() => {
		if (info) {
			const onSub = onSnapshot(doc(db, 'users', uid), (snapshot) => {
				if (snapshot.exists()) {
					setAuth({
						isAdmin: snapshot.data().isAdmin,
						isUser: !snapshot.data().isAdmin,
						class: snapshot.data().userClass,
					});
				} else {
					setAuth({
						isAdmin: false,
						isUser: false,
						class: '',
					});
				}
			});

			return () => onSub();
		}
	}, [uid, setAuth, info]);

	useEffect(() => {
		if (info && isAdmin) {
			const unSub = onSnapshot(collection(db, 'users'), (snap) => {
				const users = [];

				if (!snap.empty) {
					snap.forEach((user) => {
						users.push(user.data());
					});
				}

				setUsers(users);
			});

			return () => unSub();
		}
	}, [setUsers, info, isAdmin]);

	useEffect(() => {
		if (info && (isAdmin || isUser)) {
			const unSub = onSnapshot(
				isAdmin
					? selection !== 0
						? query(
								collection(db, 'studentData'),
								where('class', '==', selection)
						  )
						: collection(db, 'studentData')
					: query(
							collection(db, 'studentData'),
							where('class', '==', teacherClass)
					  ),
				(snapshot) => {
					const docs = [];

					if (!snapshot.empty) {
						snapshot.forEach((doc) => {
							docs.push(doc.data());
						});
					}

					setRecord(docs);
				}
			);

			return () => unSub();
		}
	}, [setRecord, teacherClass, isAdmin, selection, info, isUser]);

	const value = {
		document,
		setDoc,
		values,
		setValues,
		info,
		setInfo,
		authState,
		setAuth,
		studentRecord,
		setRecord,
		selectedValues,
		setSelectedValues,
		selected,
		setSelected,
		users,
		setUsers,
	};

	return (
		<ModalContext.Provider value={value}>{children}</ModalContext.Provider>
	);
};

export const useModalContext = () => useContext(ModalContext);
export default ModalProvider;
