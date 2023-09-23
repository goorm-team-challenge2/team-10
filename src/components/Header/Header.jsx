import cn from 'classnames';

import {
	Button,
	Typography,
	Modal,
	CarouselIndicators,
	Input,
	Label,
} from '@goorm-dev/gds-challenge';
import page1 from '../Page1/page1';

import styles from './Header.module.scss';
import { useState, useEffect } from 'react';

const Header = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [info, setInfo] = useState({});

	const [name, setName] = useState('');
	const [tel, setTel] = useState('');
	const [email, setEmail] = useState('');

	const [isAll, setIsAll] = useState(false);
	const [checked, setChecked] = useState([false, false]);
	const [isAdver, setIsAdver] = useState(false);
	const [selectChecked, setSelectChecked] = useState([false, false]);

	const [isComplete, setIsComplete] = useState(false);

	const handleChangeName = (e) => {
		setName(e.target.value);
		if (name) {
			const newInfo = { ...info };
			newInfo.name = name;
			setInfo(newInfo);
		}
	};

	const handleChangeTel = (e) => {
		setTel(e.target.value);
		if (tel) {
			const newInfo = { ...info };
			newInfo.tel = tel;
			setInfo(newInfo);
		}
	};

	const handleChangeEmail = (e) => {
		setEmail(e.target.value);
		if (email) {
			const newInfo = { ...info };
			newInfo.email = email;
			setInfo(newInfo);
		}
	};

	const handleAllCheck = () => {
		setIsAll(!isAll);
	};

	// 전체 동의
	useEffect(() => {
		if (isAll) {
			setChecked([true, true]);
			setSelectChecked([true, true]);
			setIsAdver(true);
		} else {
			setChecked([false, false]);
			setSelectChecked([false, false]);
			setIsAdver(false);
		}
	}, [isAll]);

	const handleAdverCheck = () => {
		setIsAdver(!isAdver);
	};

	useEffect(() => {
		if (isAdver) {
			setSelectChecked([true, true]);
		} else {
			setSelectChecked([false, false]);
		}
	}, [isAdver]);

	useEffect(() => {
		const newInfo = {
			이름: name,
			번호: tel,
			이메일: email,
		};
		setInfo(newInfo);
		if (info.name && info.tel && info.email && checked[0]) {
			setIsComplete(true);
		} else {
			setIsComplete(false);
		}
	}, [name, tel, email, checked]);
	const toggle = () => {
		setIsOpen(!isOpen);
	};
	return (
		<header className={cn(styles.header)}>
			<div className={cn(styles.contents)}>
				<Typography token="h5">
					구름톤 챌린지 참여자 정보 수집
				</Typography>
				<Button size="lg" onClick={toggle}>
					설문조사 참여하기
				</Button>
				<Modal isOpen={isOpen} toggle={toggle} fade>
					<Modal.Header toggle={toggle}>설문조사</Modal.Header>
					<Modal.Body>
						<div>
							<Typography
								weight={500}
								color="dark"
								token="h3"
								block
							>
								참여자 정보를 입력해주세요.
							</Typography>
							<br />
							<Typography
								weight={700}
								color="info"
								token="subtitle-1"
								block={false}
							>
								오프라인 팀 챌린지 참여자의 정보를 수집하려고
								해요.
							</Typography>
							<br />
							<Label required pointer>
								이름
							</Label>
							<Input
								type="text"
								invalid={false}
								block
								checked={false}
								disabled={false}
								size="lg"
								placeholder="이름을 입력해주세요."
								onChange={handleChangeName}
							/>
							<Label required pointer>
								전화번호
							</Label>
							<Input
								type="tel"
								invalid={false}
								block
								checked={false}
								disabled={false}
								size="lg"
								placeholder="ex. 01012345678"
								onChange={handleChangeTel}
							/>
							<Label required pointer>
								이메일
							</Label>
							<Input
								type="email"
								invalid={false}
								block
								checked={false}
								disabled={false}
								size="lg"
								placeholder="ex. goormee@goorm.io"
								onChange={handleChangeEmail}
							/>
							<Input
								type="checkbox"
								label="전체 동의"
								onChange={handleAllCheck}
								checked={isAll}
							/>
							<Input
								type="checkbox"
								label="(필수) 개인정보처리방침"
								checked={checked[0]}
								onChange={() => {
									setChecked([!checked[0], checked[1]]);
								}}
							/>
							<Input
								type="checkbox"
								label="(선택) 마케팅 목적의 개인 정보 수집 및 이용)"
								checked={checked[1]}
								onChange={() => {
									setChecked([checked[0], !checked[1]]);
								}}
							/>
							<Input
								type="checkbox"
								label="(선택) 광고성 정보 수신"
								checked={isAdver}
								onChange={handleAdverCheck}
							/>
							<Input
								type="checkbox"
								label="이메일"
								checked={selectChecked[0]}
								onChange={() => {
									setSelectChecked([
										!selectChecked[0],
										selectChecked[1],
									]);
								}}
							/>
							<Input
								type="checkbox"
								label="SMS"
								checked={selectChecked[1]}
								onChange={() => {
									setSelectChecked([
										selectChecked[0],
										!selectChecked[1],
									]);
								}}
							/>
							<Typography color="primary" weight={600}>
								※ 광고성 정보 수신에 동의하시면 챌린지에 꾸준히
								참여하실 수 있도록 리마인드 알림을 보내드려요.
							</Typography>
						</div>
					</Modal.Body>
					<Modal.Footer>
						<CarouselIndicators length={4} activeIndex={0} />
						<Button>다음</Button>
					</Modal.Footer>
				</Modal>
			</div>
		</header>
	);
};

export default Header;
