using System;

// this class contains the util function for string array transformations
public class ParserUtil
{
    public static int[] stringToIntegerArray(string input)
	{
		// null
		if (input.Equals("null"))
		{
			return null;
		}
		// empty array
		if (input.Equals("[]"))
		{
			return new int[]{};
		}
		input = input.Trim();
		input = input.Substring(1, (input.Length - 1) - 1);
		if (input.Length == 0)
		{
			return new int[0];
		}

		string[] parts = input.Split(',');
		int[] output = new int[parts.Length];
		for (int index = 0; index < parts.Length; index++)
		{
			string part = parts[index].Trim();
			output[index] = int.Parse(part);
		}
		return output;
	}
	
}