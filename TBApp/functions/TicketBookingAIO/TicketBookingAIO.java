import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.logging.Level;
import java.util.logging.Logger;

import javax.servlet.ServletInputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.catalyst.advanced.CatalystAdvancedIOHandler;
import com.zc.component.object.ZCObject;
import com.zc.component.object.ZCRowObject;
import com.zc.component.zcql.ZCQL;

import org.json.simple.JSONObject;
import org.json.JSONArray;
import org.json.simple.parser.JSONParser;

public class TicketBookingAIO implements CatalystAdvancedIOHandler {
	private static final Logger LOGGER = Logger.getLogger(TicketBookingAIO.class.getName());

	private static String TABLENAME = "Movies";
	private static String TABLENAME1 = "Bookings";
	JSONObject responseData = new JSONObject();
	static String GET = "GET";
	static String POST = "POST";

	@Override
	@SuppressWarnings("unchecked")
	public void runner(HttpServletRequest request, HttpServletResponse response) throws Exception {

		try {

			// Fetches the endpoint and method to which the call was made

			String url = request.getRequestURI();
			LOGGER.log(Level.INFO, url);
			String method = request.getMethod();
			LOGGER.log(Level.INFO, method);

			// The GET API that checks the table for an alien encounter in that city

			if ((url.equals("/getTicket")) && method.equals(GET)) {
				JSONArray jsonArray = new JSONArray();
				String query = "select * from " + TABLENAME;
				LOGGER.log(Level.INFO, query);
				// Gets the ZCQL instance and executes query using the query string

				ArrayList<ZCRowObject> rowList = ZCQL.getInstance().executeQuery(query);
				LOGGER.log(Level.INFO, "" + rowList.size());
				for (int i = 0; i < rowList.size(); i++) {
					JSONObject formDetailsJson = new JSONObject();
					formDetailsJson.put("MovieName", rowList.get(i).get(TABLENAME, "MovieName"));
					formDetailsJson.put("SeatCount", rowList.get(i).get(TABLENAME, "SeatCount"));
					formDetailsJson.put("Amount", rowList.get(i).get(TABLENAME, "Amount"));
					formDetailsJson.put("Location", rowList.get(i).get(TABLENAME, "Location"));
					formDetailsJson.put("ShowTime", rowList.get(i).get(TABLENAME, "ShowTime"));
					formDetailsJson.put("TheatreName", rowList.get(i).get(TABLENAME, "TheatreName"));
					jsonArray.put(formDetailsJson);
				}
				LOGGER.log(Level.INFO, jsonArray.toString());
				response.setStatus(200);
				response.setContentType("application/json");
				response.getWriter().write(jsonArray.toString());

			}
			if ((url.equals("/getBookings")) && method.equals(GET)) {
				JSONArray jsonArray = new JSONArray();
				String query = "select * from " + TABLENAME1;
				LOGGER.log(Level.INFO, query);
				// Gets the ZCQL instance and executes query using the query string

				ArrayList<ZCRowObject> rowList = ZCQL.getInstance().executeQuery(query);
				LOGGER.log(Level.INFO, "" + rowList.size());
				for (int i = 0; i < rowList.size(); i++) {
					JSONObject formDetailsJson = new JSONObject();
					formDetailsJson.put("MovieName", rowList.get(i).get(TABLENAME1, "MovieName"));
					formDetailsJson.put("MovieID", rowList.get(i).get(TABLENAME1, "MovieID"));
					formDetailsJson.put("TotalAmount", rowList.get(i).get(TABLENAME1, "TotalAmount"));
					formDetailsJson.put("BookedDate", rowList.get(i).get(TABLENAME1, "BookedDate"));
					jsonArray.put(formDetailsJson);
				}
				LOGGER.log(Level.INFO, jsonArray.toString());
				response.setStatus(200);
				response.setContentType("application/json");
				response.getWriter().write(jsonArray.toString());

			} else if ((url.equals("/admin")) && method.equals(POST)) {
				LOGGER.log(Level.INFO, "inside post");

				ServletInputStream requestBody = request.getInputStream();

				JSONParser jsonParser = new JSONParser();

				JSONObject jsonObject = (JSONObject) jsonParser.parse(new InputStreamReader(requestBody, "UTF-8"));

				String MovieName = (String) jsonObject.get("movie-name");
				String Location = (String) jsonObject.get("location");
				String TheatreName = (String) jsonObject.get("theatre-name");
				String SeatCount = (String) jsonObject.get("seat-count");
				String Amount = (String) jsonObject.get("amount");
				LOGGER.log(Level.INFO, MovieName);
				LOGGER.log(Level.INFO, Location);
				ZCRowObject row = ZCRowObject.getInstance();
				row.set("MovieName", MovieName);
				row.set("Location", Location);
				row.set("TheatreName", TheatreName);
				row.set("SeatCount", SeatCount);
				row.set("Amount", Amount);
				ZCObject.getInstance().getTableInstance(TABLENAME).insertRow(row);

				responseData.put("data", "Movie name inserted!!!!");
				LOGGER.log(Level.INFO, responseData.get("data").toString());
				response.setStatus(200);
				response.setContentType("application/json");
				response.getWriter().write(responseData.toString());

			}
		} catch (Exception e) {

			// The actions are logged. You can check the logs from Catalyst Logs.

			LOGGER.log(Level.SEVERE, "Exception in AlienCityAIO", e);

			responseData.put("error", "Internal server error occurred. Please try again in some time.");

			response.getWriter().write(responseData.toString());

			response.setStatus(500);

		}
	}
}
