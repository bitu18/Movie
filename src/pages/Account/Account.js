import classNames from 'classnames/bind';

import styles from './Account.module.scss';
import Popper from '~/components/Popper';
import Button from '~/components/Button';
import { Trans, useTranslation } from 'react-i18next';
import { useForm } from '~/store';
import { useEffect, useRef, useState } from 'react';
import HeaderListMovie from '~/components/HeaderListMovie';

const cx = classNames.bind(styles);
function Account() {
    const { t } = useTranslation();
    const { userInfor, setUserInfor } = useForm();

    const topRef = useRef();

    const [previewAvatar, setPreviewAvatar] = useState(userInfor.avatar);
    const [avatarFile, setAvatarFile] = useState(null);
    const [input, setInput] = useState({
        name: userInfor?.name || '',
        email: userInfor?.email || '',
        about: userInfor.about || '',
    });

    useEffect(() => {
        // Clean up ObjectURL when component unmounts or avatar changes
        return () => {
            if (previewAvatar && previewAvatar.startsWith('blob:')) {
                URL.revokeObjectURL(previewAvatar);
            }
        };
    }, [previewAvatar]);

    const handleChangePhoto = (e) => {
        const file = e.target.files[0];
        if (file) {
            const newAvatar = URL.createObjectURL(file);
            setPreviewAvatar(newAvatar);
            setAvatarFile(file);
        }
    };

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setInput((prevState) => ({ ...prevState, [id]: value }));
    };

    const fileToBase64 = (file) =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
            reader.readAsDataURL(file);
        });

    const handleSave = async () => {
        let avatarData = previewAvatar;
        if (avatarFile) {
            // Convert file to Base64
            avatarData = await fileToBase64(avatarFile);
        }

        const updateUser = {
            ...userInfor,
            name: input.name.trim() || userInfor.name,
            email: input.email.trim() || userInfor.email,
            about: input.about.trim() || userInfor.about,
            avatar: avatarData,
        };

        setUserInfor(updateUser);
        localStorage.setItem('currentUser', JSON.stringify(updateUser));
        if (topRef.current) {
            topRef.current.scrollIntoView({ block: 'start', inline: 'start', behavior: 'smooth' });
        }
    };
    return (
        <div className={cx('wrapper')} ref={topRef}>
            <div className={cx('title')}>
                <HeaderListMovie title="Account" />
            </div>
            <Popper className={cx('popper')}>
                {/* <h3>Cập Nhật Thông Tin</h3> */}
                <div className={cx('img-holder')}>
                    <div className={cx('img-preview')}>
                        <img src={previewAvatar} alt={userInfor.name || 'avatar'} className={cx('avatar')} />
                    </div>
                    <label className={cx('input-file')}>
                        <input
                            type="file"
                            id="avatar-upload"
                            accept="image/*"
                            style={{ display: 'none' }}
                            onChange={handleChangePhoto}
                        />
                        <Trans>Change</Trans>
                    </label>
                </div>

                <div className={cx('list')}>
                    <div className={cx('infor')}>
                        <label htmlFor="name">
                            <Trans>Name</Trans>
                        </label>
                        <input
                            type="text"
                            id="name"
                            value={input.name}
                            placeholder={t('Name')}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className={cx('infor')}>
                        <label htmlFor="email">
                            <Trans>Email</Trans>
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={input.email}
                            placeholder={t('Email')}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className={cx('infor')}>
                        <label htmlFor="des">
                            <Trans>About</Trans>
                        </label>
                        <textarea
                            id="about"
                            value={input.about}
                            placeholder={t('About')}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>
                <div className={cx('save')}>
                    <Button primary className={cx('btn')} onClick={handleSave}>
                        <Trans>Save</Trans>
                    </Button>
                </div>
            </Popper>
        </div>
    );
}

export default Account;
