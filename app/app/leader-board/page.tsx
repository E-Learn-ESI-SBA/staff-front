import { getLeaderBoard } from "@/app/actions";
import AlertError from "@/components/common/error";
import LeaderBoard from "@/components/dashboard/student/studentProfile/leaderboard";
import { IError } from "@/types/errors";
import { dailyStudents, weeklyStudents } from "@/static/content/rank";
import { toast } from "sonner";

export default async function ProfilePage() {
  let err = new IError();
  let ranking = null;
  try {
    ranking = await getLeaderBoard()
  } catch (err: any) {

    err = new IError(err)
    //  return toast.error(err.message, {
    //     style: {
    //       backgroundColor: "red",
    //       color: "white",
    //     },
    //   });
    console.log(err)
  }
  return (
    <>
      {ranking ? <LeaderBoard  dailyStudents={ranking?.day} weeklyStudents={ranking?.week}/> :
        <div>
          <AlertError error={err} />
          <div className="flex justify-center">
            <p className="text-blue-700 justify-center">Dummy data will be shown here</p>
          </div>
          <LeaderBoard  dailyStudents={dailyStudents} weeklyStudents={weeklyStudents}/>
        </div>}
    </>
  );
}
