import React, { useState } from 'react';
import { Form, Button } from 'semantic-ui-react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { updatePasswordApi } from '../../../api/user';

export default function ChangePasswordForm(props) {
    const {user, logout, setReloadUser} = props;
    const [loading, setLoading] = useState(false);

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: Yup.object(validationSchema()),
        onSubmit: async (formData) => {
            setLoading(true);
            const response = await updatePasswordApi(user.id, formData.password, logout);
            if(!response || response?.statusCode === 400) {
                toast.error("Error actualizando contraseña");
            } else {
                logout();
            }
            setLoading(false);
        }
    });

    return (
        <div className="change-password-form">
            <h4>
                Cambia tu contraseña
            </h4>
            <Form onSubmit={formik.handleSubmit}>
                <Form.Group widths="equal">
                    <Form.Input 
                        name="password"
                        type="password"
                        placeholder="Tu nuevo password"
                        onChange={formik.handleChange}
                        value={formik.values.password}
                        error={formik.errors.password}                        
                    />
                    <Form.Input 
                        name="repeatPassword"
                        type="password"
                        placeholder="confirma tu password"
                        onChange={formik.handleChange}
                        value={formik.values.repeatPassword}
                        error={formik.errors.repeatPassword}
                    />
                </Form.Group>
                <Button className="submit" type="submit" Loading={loading} >Actualizar</Button>
            </Form>
        </div>
    )
}

function initialValues() {
    return {
        password: "",
        repeatPassword: ""
    };
}

function validationSchema() {
    return {
        password: Yup.string().required(true).oneOf([Yup.ref("repeatPassword")], true),
        repeatPassword: Yup.string().required(true).oneOf([Yup.ref("password")], true),
    }
}