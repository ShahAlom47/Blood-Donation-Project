
import bg from '../../assets/image/blood-donate-bg.png';
import PageHeading from '../../Components/PageHeading';
import ContentInfo from './MainContant/ContentInfo/ContentInfo';
import MoneyDonationForm from './MainContant/MoneyDonationForm/MoneyDonationForm';

const DonateMoney = () => {
    return (
        <div>
            <PageHeading title={'Donate Now'} img={bg}> </PageHeading>

            <div className='max-w p-4 '>

                <div className=' flex lg:flex-row md:flex-row flex-col gap-3'>
                    <aside className='w-4/12 border-2 border-black min-h-screen'>


                    </aside>
                    <div className='flex-1 border border-black min-h-screen p-3'>
                        <ContentInfo></ContentInfo>
                        <MoneyDonationForm></MoneyDonationForm>

                    </div>
                </div>
            </div>

        </div>
    );
};

export default DonateMoney;