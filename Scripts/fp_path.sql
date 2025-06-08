DECLARE
   v_path		 VARCHAR2(2000) := 'f?p=&APP_ID.:0:&APP_SESSION.:APPLICATION_PROCESS=MY_PRC:::APP_ID:&APP_USER.';
   v_param_name		 VARCHAR2(100);
   v_param		 VARCHAR2(100);
   v_pos		 NUMBER			:= 1;
   v_colon_index NUMBER;

BEGIN
   ---------------------------------------------------
   v_path := v_path || ':';
   ---------------------------------------------------

   IF (v_path LIKE 'f?p=%') THEN
	  --v_path := SubStr(v_path, 5);
	  v_pos := INSTR(v_path, '=', 1) + 1;
   END IF;
   ---------------------------------------------------

   DBMS_OUTPUT.PUT_LINE('Length:' || LENGTH(v_path));
   DBMS_OUTPUT.PUT_LINE('--------------------------------------');
   ---------------------------------------------------
   FOR COUNTER IN 1 .. 9
   LOOP
	  v_param := NULL;
	  v_colon_index := INSTR(v_path, ':', v_pos);
	  --DBMS_OUTPUT.PUT_LINE(v_pos || ' | ' || v_index || ' | ' || (v_index - v_pos));

	  IF (v_pos < LENGTH(v_path)) THEN
		 v_param := SUBSTR(v_path, v_pos, v_colon_index - v_pos);
	  END IF;

	  v_param_name :=
				CASE COUNTER
					WHEN 1 THEN 'application'
					WHEN 2 THEN 'page'
					WHEN 3 THEN 'session'
					WHEN 4 THEN 'request'
					WHEN 5 THEN 'debug'
					WHEN 6 THEN 'cache'
					WHEN 7 THEN 'item names'
					WHEN 8 THEN 'item values'
					WHEN 9 THEN 'print frindly'
				END;

	  DBMS_OUTPUT.PUT_LINE(COUNTER || '-' || v_param_name || ': ' || v_param);

	  IF (v_pos < LENGTH(v_path)) THEN
		 v_pos := v_colon_index + 1;
	  END IF;

   END LOOP;


END;