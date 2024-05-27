import { auth, signOut } from "@/auth";

const SettingPage = () => {
    const session = auth();
    // console.log(session);
    return (
        <div>
            {JSON.stringify(session)}
            <form action={ async () =>{
                  "use server";
                  await signOut({
                    redirectTo: "/login",
                  });
            }}>
              
            <button type="submit">Sign out</button>
            </form>
        </div>
    );
};

export default SettingPage;