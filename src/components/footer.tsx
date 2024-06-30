const Footer = () => {
    return (
      <div className="w-full min-h-[20vh] bg-white dark:bg-black">
        <div className="flex items-center container p-6 h-full">
          <p>{new Date().getFullYear()} BookQuest. All Rights Reserved.</p>
        </div>
      </div>
    );
  };
  
  export default Footer;