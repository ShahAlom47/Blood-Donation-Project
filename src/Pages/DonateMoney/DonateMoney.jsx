
import bg from '../../assets/image/blood-donate-bg.png';
import PageHeading from '../../Components/PageHeading';
import PhotoGallery from './Aside/PhotoGallery/PhotoGallery';
import UseDonationInfo from './Aside/YearlyTotalDonation/UseDonationInfo';
import YearlyTotalDonation from './Aside/YearlyTotalDonation/YearlyTotalDonation';
import ContentInfo from './MainContant/ContentInfo/ContentInfo';
import MoneyDonationForm from './MainContant/MoneyDonationForm/MoneyDonationForm';

const DonateMoney = () => {
    return (
        <div>
            <PageHeading title={'Donate Now'} img={bg}> </PageHeading>

            <div className='max-w p-1 lg:p-4 md:p-3 min-h-screen '>

                <div className=' flex lg:flex-row md:flex-row flex-col-reverse gap-3 mb-8'>
                    <aside className='lg:w-4/12 md:w-4/12 w-full   overflow-y-scroll  max-h-full  m-3'>
                        <YearlyTotalDonation></YearlyTotalDonation>
                        <UseDonationInfo></UseDonationInfo>
                        <PhotoGallery></PhotoGallery>

                    </aside>
                    <div className='flex-1  p-3  overflow-hidden'>
                        <ContentInfo></ContentInfo>
                        
                        <MoneyDonationForm></MoneyDonationForm>

                    </div>
                </div>
            </div>

        </div>
    );
};

export default DonateMoney;