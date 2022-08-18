--
-- PostgreSQL database dump
--

-- Dumped from database version 14.5
-- Dumped by pg_dump version 14.5

-- Started on 2022-08-18 16:12:01

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 211 (class 1259 OID 16395)
-- Name: auth; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.auth (
    user_id integer NOT NULL,
    username character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    role boolean DEFAULT false NOT NULL,
    verified boolean DEFAULT false NOT NULL
);


ALTER TABLE public.auth OWNER TO postgres;

--
-- TOC entry 210 (class 1259 OID 16394)
-- Name: auth_user_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.auth ALTER COLUMN user_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.auth_user_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 999999999
    CACHE 1
);


--
-- TOC entry 3308 (class 0 OID 16395)
-- Dependencies: 211
-- Data for Name: auth; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.auth (user_id, username, email, password, role, verified) OVERRIDING SYSTEM VALUE VALUES (2, 'aldrichneil', 'aldrich.neil.hung@gmail.com', '$2a$10$/lBGZSFx6WGnSCk9vTrzYOt4lS/mftivDVspyg9hUyiyNQYaxtflu', false, false);
INSERT INTO public.auth (user_id, username, email, password, role, verified) OVERRIDING SYSTEM VALUE VALUES (3, 'postman', 'postman@gmail.com', '$2a$10$1XOFrIqWOSaQI.Wtb7SJweKD.B1x7Kzh4l0GQ/.j1oi2V5nzNM.e6', false, false);


--
-- TOC entry 3314 (class 0 OID 0)
-- Dependencies: 210
-- Name: auth_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.auth_user_id_seq', 3, true);


--
-- TOC entry 3167 (class 2606 OID 16401)
-- Name: auth auth_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth
    ADD CONSTRAINT auth_pkey PRIMARY KEY (user_id);


-- Completed on 2022-08-18 16:12:01

--
-- PostgreSQL database dump complete
--

