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

    // return an array as a string to save to file
	public static string integerArrayToString(int[] nums, int length)
	{
		if (length == 0)
		{
			return "[]";
		}

		string result = "";
		for (int index = 0; index < length; index++)
		{
			int number = nums[index];
			result += Convert.ToString(number) + ", ";
		}
		return "[" + result.Substring(0, result.Length - 2) + "]";
	}
	
}