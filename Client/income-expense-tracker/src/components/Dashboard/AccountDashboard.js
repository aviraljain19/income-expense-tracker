import AccountList from "./AccountList";
import AccountSummary from "./AccountSummary";

const AccountDashboard = () => {
  return (
    <>
      <div
        className="bg-red-100 border text-center border-red-400 text-red-700 px-4 py-3 rounded relative"
        role="alert"
      >
        <strong className="font-bold">Error!</strong>
        <span className="block sm:inline ">Error here</span>
      </div>
      <AccountSummary />
      <AccountList />
    </>
  );
};

export default AccountDashboard;
