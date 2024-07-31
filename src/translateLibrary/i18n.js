// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n.use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources: {
            en: {
                translation: {
                    'Search your movie': 'Search your movie',
                    Login: 'Login',
                    Register: 'Register',
                    Language: 'Language',
                    language: 'Language',
                    'Help center': 'Help center',
                    Setting: 'Setting',
                    'Dark Mode': 'Dark Mode',
                    'Light Mode': 'Light Mode',
                    'View Profile': 'View Profile',
                    'Log out': 'Log out',
                    Home: 'Home',
                    'Playing Now': 'Playing Now',
                    Movie: 'Movie',
                    'Series Movie': 'Series Movie',
                    'TV Shows': 'TV Shows',
                    Category: 'Category',
                    Nation: 'Nation',
                    'View all': 'View all',
                    'Thuyết Minh': 'Narration',
                    'Lồng Tiếng': 'Voiceover',
                    'Vietsub + Thuyết Minh': 'Vietsub + Narration',
                    'Vietsub + Lồng Tiếng': 'Vietsub + Voiceover',

                    'Lồng Tiếng #1': 'Voiceover #1',
                    'Thuyết minh #1': 'Narration #1',
                },
            },
            vi: {
                translation: {
                    // Sidebar
                    'Playing now': 'Phim Đang Chiếu',

                    // Header
                    'Search your movie': 'Tìm kiếm phim...',
                    Login: 'Đăng nhập',
                    Register: 'Đăng ký',
                    Hi: 'Xin chào',
                    'View profile': 'Trang cá nhân',
                    Language: 'Ngôn ngữ',
                    English: 'Tiếng Anh',
                    Vietnamese: 'Tiếng Việt',
                    'Help center': 'Trung tâm hỗ trợ',
                    Setting: 'Cài đặt',
                    'Dark Mode': 'Chế độ tối',
                    'Light Mode': 'Chế độ sáng',
                    'View Profile': 'Xem hồ sơ',
                    'Log out': 'Đăng xuất',

                    // Navigation
                    Home: 'Trang Chủ',
                    'Playing Now': 'Phim Đang Chiếu',
                    Movie: 'Phim Lẻ',
                    'Series Movie': 'Phim Bộ',
                    'TV Shows': 'Phim Truyền Hình',
                    Category: 'Thể Loại',
                    Nation: 'Quốc Gia',

                    // Movie Infor
                    'View all': 'Xem tất cả',
                    Voiceover: 'Lồng Tiếng',
                    Narration: 'Thuyết Minh',
                    'Vietsub + Thuyết Minh': 'Vietsub + Thuyết Minh',
                    'Vietsub + Lồng Tiếng': 'Vietsub + Lồng Tiếng',
                    'Thuyết Minh': 'Thuyết Minh',
                    'Lồng Tiếng': 'Lồng Tiếng',

                    // Year
                    year: 'năm',
                    'Before 2000': 'Trước 2000',

                    // Category
                    Action: 'Hành động',
                    Adventure: 'Phiêu lưu',
                    Cartoon: 'Hoạt hình',
                    Comedy: 'Hài',
                    Criminal: 'Hình sự',
                    Documentary: 'Tài liệu',
                    Drama: 'Tâm lý',
                    Family: 'Gia đình',
                    Fantasy: 'Huyền bí',
                    Historical: 'Lịch sử',
                    Horror: 'Kinh dị',
                    Musical: 'Nhạc',
                    Mystery: 'Huyền bí',
                    Romance: 'Lãng mạn',
                    'Science-Fiction': 'Khoa học viễn tưởng',
                    Thriller: 'Giật gân',
                    War: 'Chiến tranh',
                    Melodrama: 'Tâm lý',
                    '18+': '18+',

                    // Nation
                    US: 'Mỹ',
                    UK: 'Anh',
                    China: 'Trung Quốc',
                    Indonesia: 'Indonesia',
                    Vietnam: 'Việt Nam',
                    France: 'Pháp',
                    'Hong Kong': 'Hồng Kông',
                    Korea: 'Hàn Quốc',
                    Japan: 'Nhật Bản',
                    Thailand: 'Thái Lan',
                    Taiwan: 'Đài Loan',
                    Russia: 'Nga',
                    Netherlands: 'Hà Lan',
                    Philippines: 'Philippines',
                    India: 'Ấn Độ',
                    'Other Countries': 'Quốc gia khác',

                    // Page
                    'Prev Page': 'Trang trước',
                    'Next Page': 'Trang sau',
                    Contact: 'Liên Hệ',
                    Support: 'Hỗ Trợ',

                    // Movie Detail
                    Duration: 'Thời Lượng',
                    Year: 'Năm',
                    Director: 'Đạo diễn',
                    Starring: 'Diễn viên',
                    Genre: 'Thể loại',
                    Share: 'Chia Sẻ',
                    Watch: 'Xem',
                    'Movie Content': 'Nội Dung',
                    'Movie Video': 'Chiếu Phim',
                    'Voiceover #1': 'Lồng Tiếng #1',
                    'Narration #1': 'Thuyết minh #1',
                    'Thuyết minh #1': 'Thuyết minh #1',
                    'Lồng Tiếng #1': 'Lồng Tiếng #1',

                    // Footer
                    'About Us': 'Giới Thiệu',
                    'is the most watched free TV and movie. Movie sources are compiled from major websites with diverse genres. They are helping users have a great experience with varied and user-friendly interface design.':
                        'là kênh truyền hình và phim miễn phí được xem nhiều nhất. Nguồn phim được biên soạn từ các trang web lớn với nhiều thể loại khác nhau. Chúng giúp người dùng có trải nghiệm tuyệt vời với thiết kế giao diện đa dạng và thân thiện người dùng.',
                },
            },
        },
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;
