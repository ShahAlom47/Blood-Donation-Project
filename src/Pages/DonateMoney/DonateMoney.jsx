
import bg from '../../assets/image/blood-donate-bg.png';
import PageHeading from '../../Components/PageHeading';
import YearlyTotalDonation from './Aside/YearlyTotalDonation/YearlyTotalDonation';
import ContentInfo from './MainContant/ContentInfo/ContentInfo';
import MoneyDonationForm from './MainContant/MoneyDonationForm/MoneyDonationForm';

const DonateMoney = () => {
    return (
        <div>
            <PageHeading title={'Donate Now'} img={bg}> </PageHeading>

            <div className='max-w p-1 lg:p-4 md:p-3 '>

                <div className=' flex lg:flex-row md:flex-row flex-col-reverse gap-3'>
                    <aside className='lg:w-4/12 md:w-4/12 w-full border-2 border-black min-h-screen'>
                        <YearlyTotalDonation></YearlyTotalDonation>

                    </aside>
                    <div className='flex-1  p-3'>
                        <ContentInfo></ContentInfo>
                        
                        <MoneyDonationForm></MoneyDonationForm>

                    </div>
                </div>
            </div>

        </div>
    );
};

export default DonateMoney;