import { observer } from "mobx-react-lite";
import React from "react";  
import { useEffect } from "react";
import { Grid } from "semantic-ui-react";
import LoadingComponent from "../../../App/Layout/loadingComponent";
import { useStore } from "../../../App/stores/store";
import ActivityList from "./ActivityList";


 function ActivityDashboard(){

    const {activityStore} = useStore();
    const {loadActivities, activityRegistry} = activityStore

    useEffect(() => {
      if (activityRegistry.size <= 0) loadActivities();
    }, [activityRegistry.size, loadActivities])
  
  
  
    if(activityStore.loadingInitial) return <LoadingComponent content='Loading app' />
    return(
        <Grid>
            <Grid.Column width='10'>
                   <ActivityList />
            </Grid.Column>
            <Grid.Column width='6'>
                {/* {selectedActivity && !editMode &&
                <ActivityDetails />}
                {editMode &&
                <ActivityForm
                 />} */}
                 <h2>Activity Filters Component</h2>
            </Grid.Column>
        </Grid>
    )
}

export default observer(ActivityDashboard);
