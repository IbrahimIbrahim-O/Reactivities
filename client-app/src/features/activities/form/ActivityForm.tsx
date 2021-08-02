import { observer } from "mobx-react-lite";
import React  from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { Button, Header, Segment } from "semantic-ui-react";
import LoadingComponent from "../../../App/Layout/loadingComponent";
import { useStore } from "../../../App/stores/store";
import { v4 as uuid } from "uuid";
import { Formik, Form } from "formik";
import * as Yup from 'yup';
import MyTextInput from "../../../App/common/form/MyTextInput";
import MyTextArea from "../../../App/common/form/MyTextArea";
import MySelectInput from "../../../App/common/form/MySelectInput";
import { categoryOptions } from "../../../App/common/options/categoryOptions";
import MyDateInput from "../../../App/common/form/MyDateInput";
import { Activity } from "../../../App/Models/activity";


export default observer(function ActivityForm(){
    const history = useHistory();
    const {activityStore} = useStore();
    const{ createActivity, updateActivity, loading, loadActivity, loadingInitial} = activityStore;
    const {id} = useParams<{id: string}>();
    
    const [activity, setActivity] = useState<Activity>({
        id: '',
        title: '',
        category:'',
        description:'',
        date: null,
        city:'',
        venue:''
    });

    const validationSchema = Yup.object({
        title: Yup.string().required('Title is Required'),
        description: Yup.string().required('Description is Required'),
        category: Yup.string().required(),
        date: Yup.string().required('Date is Required').nullable(),
        venue: Yup.string().required(),
        city: Yup.string().required(),
    })

    useEffect(() => {
        if(id) loadActivity(id).then(activity => setActivity(activity!))
    }, [id, loadActivity])

    function handleFormSubmit(activity: Activity){
        if(activity.id.length === 0){
            let newActivity = {
                ...activity,
                id: uuid()
            };
            createActivity(newActivity).then(() => history.push(`/activities/${newActivity.id}`))
        }else{
            updateActivity(activity).then(() => history.push(`/activities/${activity.id}`))
        }
    }

    // function handleChange(event: ChangeEvent<HTMLInputElement>){
    //     const {name, value} = event.target;
    //     setActivity({...activity, [name]: value})
    // }

    if(loadingInitial) return <LoadingComponent content="Loading Activity..." />

    return(
        <Segment clearing>
            <Header content='Actvity Details' sub color='teal' />
            <Formik 
                enableReinitialize 
                initialValues={activity} 
                onSubmit={values => handleFormSubmit(values)} 
                validationSchema={validationSchema} >

                {({ handleSubmit, isValid, isSubmitting, dirty}) => (
                    <Form className='ui form' onSubmit={handleSubmit} autoComplete={'off'}>
                        <MyTextInput name='title' placeholder='title'/>
                        <MyTextArea rows={3} placeholder='Description' name='description' />
                        <MySelectInput options={categoryOptions} placeholder='Category'  name='category'/>
                        <MyDateInput
                            placeholderText='Date'  
                            name='date'
                            showTimeSelect
                            timeCaption='time'
                            dateFormat='MMMM d, yyyy h:mm aa'
                         />
            
                        <Header content='Location Details' sub color='teal' />
                        <MyTextInput placeholder='City'  name='city'/>
                        <MyTextInput placeholder='Venue' name='venue'/>
                        <Button 
                            disabled={isSubmitting || !dirty || !isValid}
                            loading={loading} 
                            floated='right' 
                            positive type='submit' 
                            content='Submit'/>
                        <Button as={Link} to='/activities' floated='right' type='button' content='Cancel'/>
                    </Form>
                )}
            </Formik>
            
        </Segment>
    )
})