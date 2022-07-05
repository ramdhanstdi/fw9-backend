--
-- PostgreSQL database dump
--

-- Dumped from database version 14.3
-- Dumped by pg_dump version 14.3

-- Started on 2022-07-05 17:21:07

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

--
-- TOC entry 3 (class 2615 OID 2200)
-- Name: public; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA public;


ALTER SCHEMA public OWNER TO postgres;

--
-- TOC entry 3352 (class 0 OID 0)
-- Dependencies: 3
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON SCHEMA public IS 'standard public schema';


--
-- TOC entry 838 (class 1247 OID 16496)
-- Name: transfer; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.transfer AS ENUM (
    'transfer',
    'subcription'
);


ALTER TYPE public.transfer OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 212 (class 1259 OID 16478)
-- Name: profile; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.profile (
    id integer NOT NULL,
    first_name character varying,
    last_name character varying,
    profile_photo character varying,
    num_phone character varying,
    balance money,
    user_id integer NOT NULL
);


ALTER TABLE public.profile OWNER TO postgres;

--
-- TOC entry 211 (class 1259 OID 16477)
-- Name: profile_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.profile ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.profile_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 214 (class 1259 OID 16484)
-- Name: transaction; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.transaction (
    id integer NOT NULL,
    sender_id integer,
    receiver_id integer,
    transfertype integer NOT NULL,
    amount bigint NOT NULL,
    time_transfer timestamp without time zone NOT NULL,
    notes character varying
);


ALTER TABLE public.transaction OWNER TO postgres;

--
-- TOC entry 213 (class 1259 OID 16483)
-- Name: transaction_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.transaction ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.transaction_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 216 (class 1259 OID 16581)
-- Name: typetransaction; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.typetransaction (
    id integer NOT NULL,
    name character varying NOT NULL,
    description character varying
);


ALTER TABLE public.typetransaction OWNER TO postgres;

--
-- TOC entry 215 (class 1259 OID 16580)
-- Name: typetransaction_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.typetransaction ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.typetransaction_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 210 (class 1259 OID 16472)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    username character varying NOT NULL,
    email character varying NOT NULL,
    password character varying NOT NULL,
    pin character varying NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 209 (class 1259 OID 16471)
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.users ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 3342 (class 0 OID 16478)
-- Dependencies: 212
-- Data for Name: profile; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.profile (id, first_name, last_name, profile_photo, num_phone, balance, user_id) FROM stdin;
39	nobita			08917890	Rp90.000	50
5	hallo				Rp90	10
6	haha	\N	\N	\N	\N	15
1	ganti	nama	\N	0897	\N	1
2	testi	nama	\N	089611	\N	7
22	test				Rp90	13
23	test				Rp90	17
37	nobita	nama	\N	08996969999666	\N	33
\.


--
-- TOC entry 3344 (class 0 OID 16484)
-- Dependencies: 214
-- Data for Name: transaction; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.transaction (id, sender_id, receiver_id, transfertype, amount, time_transfer, notes) FROM stdin;
18	10	7	1	100000	2022-07-01 21:16:18.563567	aduhh
19	10	7	1	190000	2022-07-04 21:08:57.275693	THR
20	10	7	1	170000	2022-07-04 21:15:51.151925	THR
21	10	7	1	170000	2022-07-04 21:16:17.2435	THR
22	10	7	1	170000	2022-07-04 21:16:39.932611	THR
23	10	7	1	170000	2022-07-04 21:19:09.844635	bonus
24	10	7	1	0	2022-07-05 11:08:39.158151	bonus
25	10	7	1	12	2022-07-05 11:10:12.473124	bonus
33	7	50	1	19000	2022-07-05 16:24:22.286374	bonus
\.


--
-- TOC entry 3346 (class 0 OID 16581)
-- Dependencies: 216
-- Data for Name: typetransaction; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.typetransaction (id, name, description) FROM stdin;
1	transfer	For transfer with anyone u want
2	top_up	For adding your balance
3	Subcription	For subcription something
\.


--
-- TOC entry 3340 (class 0 OID 16472)
-- Dependencies: 210
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, username, email, password, pin) FROM stdin;
7	halo	jono@joni.con	123456	234567
10	hendri	obok@isan	1erq	232323
13	hendri123	obok@isan.com	1erqqwer	232323
15	hendri12	obok@helo.com	1erqqwer	232323
17	example	example@helo.com	RWEWRErrr	232323
19	hasan	hasan@helo.com	$2b$10$I0uGZ01O0RY6p7jh4NTY8u6dhmPhcAMSyfrQtU8eGlcgyyQ9t9nlK	232323
22	hasan2	hasan2@helo.com	$2b$10$xr7lZ5tcqIIwuszFIUOrBOzZq2oRtw3ZbQrruRWyb4s4FTHFPb53e	232323
24	hasan4	hasan4@helo.com	$2b$10$ygEpShNs23BB2iEPSl7SOOdZLfDdph3A/4/Vy/ZkVmcS8IM/L8QYy	232323
25	hasan5	hasan5@helo.com	$2b$10$jFaFF5g3f3pFOncogROk7OESnpQJSCUSiUzbI9xbBq4Y03TAFPn9W	232323
26	hasan6	hasan6@helo.com	$2b$10$qwbNVQaAqF4eWtf6sKxPzOGRBPnJ1NOcoYGYFZuyOYLbkAIz6iosy	232323
27	hasan7	hasan7@helo.com	$2b$10$KqAi7a.lAfbaChqg6eZR4eVFRyo7DlHTGP/lNnUHZK3zzOu7KIv5G	232323
28	hasan8	hasan8@helo.com	$2b$10$aQn0P06z4XpxspXM/o9qmOQMlgjRmh3MO0tT8NlHDKJGIHvjjosEu	232323
29	hasan9	hasan9@helo.com	$2b$10$mt098Nr.3xa6rV3pt27ziOQy2qbYpJzW9JX0w.vu2DhULpG2wvkcW	232323
31	hasan10	hasan10@helo.com	$2b$10$QEaKH9anEOuz6aMALOw7xegp.1jCjsgigbukN.y0HupsHXNDAtr2e	232323
33	hasan12	hasan12@helo.com	$2b$10$ZKrIN7AFJ1Td540mikGDHOs5PNojduImq07fEM8.bRYTwatBwzCsC	232323
45	hehehey	hey@yo.com	$2b$10$itIwwXH0W3oiEnRoXrEHnekVIDWhCoiJQMzTIul0Sh8csn4avhYbG	232321
32	updatega	ini@email.com	$2b$10$BpwEl4Ya3JsZ55PhwNB62O.hwfQXS7Nmj3Q2PWxz6kxXGnyXliGTe	123321
48	ronirona	heyona@yo.com	$2b$10$44cSZDM1CDz338KK1fj0xOmN.K4BrfO.NCrFAhI9L08bvkw3YR2da	232321
50	ronirona2	heyona2@yo.com	$2b$10$bGUDH0UPY3ThE2KB1gi2f.jh/z.ieBeqQFzG3a/Na76kttydX1.ka	123456
1	useredit	useredit@email.com	$2b$10$0iyIcxQMvfASXPPsPwXWze2F4afGZAithbn.rKd/tMk7d5xtakFxy	123321
\.


--
-- TOC entry 3353 (class 0 OID 0)
-- Dependencies: 211
-- Name: profile_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.profile_id_seq', 39, true);


--
-- TOC entry 3354 (class 0 OID 0)
-- Dependencies: 213
-- Name: transaction_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.transaction_id_seq', 33, true);


--
-- TOC entry 3355 (class 0 OID 0)
-- Dependencies: 215
-- Name: typetransaction_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.typetransaction_id_seq', 3, true);


--
-- TOC entry 3356 (class 0 OID 0)
-- Dependencies: 209
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 52, true);


--
-- TOC entry 3183 (class 2606 OID 16575)
-- Name: users email_un; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT email_un UNIQUE (email);


--
-- TOC entry 3195 (class 2606 OID 16603)
-- Name: typetransaction id_typetransfer; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.typetransaction
    ADD CONSTRAINT id_typetransfer PRIMARY KEY (id);


--
-- TOC entry 3189 (class 2606 OID 16509)
-- Name: profile profile_id; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.profile
    ADD CONSTRAINT profile_id PRIMARY KEY (id);


--
-- TOC entry 3193 (class 2606 OID 16511)
-- Name: transaction transaction_id; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transaction
    ADD CONSTRAINT transaction_id PRIMARY KEY (id);


--
-- TOC entry 3191 (class 2606 OID 16589)
-- Name: profile user_id; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.profile
    ADD CONSTRAINT user_id UNIQUE (user_id);


--
-- TOC entry 3185 (class 2606 OID 16573)
-- Name: users username_un; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT username_un UNIQUE (username);


--
-- TOC entry 3187 (class 2606 OID 16507)
-- Name: users users_id; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_id PRIMARY KEY (id);


--
-- TOC entry 3196 (class 2606 OID 16642)
-- Name: profile profile_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.profile
    ADD CONSTRAINT profile_fk FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3199 (class 2606 OID 16632)
-- Name: transaction transaction_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transaction
    ADD CONSTRAINT transaction_fk FOREIGN KEY (sender_id) REFERENCES public.users(id) ON DELETE SET NULL;


--
-- TOC entry 3198 (class 2606 OID 16627)
-- Name: transaction transaction_fkrev; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transaction
    ADD CONSTRAINT transaction_fkrev FOREIGN KEY (receiver_id) REFERENCES public.users(id) ON DELETE SET NULL;


--
-- TOC entry 3197 (class 2606 OID 16604)
-- Name: transaction type_transfer; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transaction
    ADD CONSTRAINT type_transfer FOREIGN KEY (transfertype) REFERENCES public.typetransaction(id);


-- Completed on 2022-07-05 17:21:07

--
-- PostgreSQL database dump complete
--

